import { useState } from "react";
import userDetailsStore from "../../store/currentUser.store";
import {
  cloud_name,
  server_url,
  upload_preset,
} from "../../../utils/configurations";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";

const UpdateProfile = () => {
  const user = userDetailsStore((state) => state.user);
  const [editWebsite, setEditWebsite] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [imageInput, setImageInput] = useState(null);
  const [error, setError] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatingImageUrl, setGeneratingImageUrl] = useState();
  const [userProfile, setUserProfile] = useState();

  const uploadImage = async () => {
    setGeneratingImageUrl(true);
    const payload = new FormData();
    payload.append("file", imageInput);
    payload.append("upload_preset", upload_preset);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        payload,
      );

      if (response.statusText === "OK") {
        setError(null);

        const secureUrl = response.data.secure_url;
        setImageLink(
          secureUrl.replace("/upload", "/upload/w_400/f_auto/q_auto"),
        );
      }
    } catch (error) {
      console.log(error);
      setError("someting went wrong while uploading this image!");
    } finally {
      setGeneratingImageUrl(false);
    }
  };

  const postUserUpdateDetails = async (data) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${server_url}/user/profile`, data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.ok) {
        toast(response.data.message, {
          theme: "success",
          duration: 4000,
          position: "top-right",
        });
        setError(null);
        setUserProfile(response.data.userProfile);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const userDetailsUpdateForm = useFormik({
    initialValues: {
      imageUrl: user.imageUrl,
      bio: user.bio,
      website: user.website,
      role: user.role,
    },
    onSubmit: (data) => {
      uploadImage();
      data.imageUrl = imageLink;
      // console.log("hey",imageLink)
      if (!error) {
        postUserUpdateDetails(data);
      }
    },
  });
  return (
    <form
      onSubmit={userDetailsUpdateForm.handleSubmit}
      className="selected-setting-container"
    >
      <>
        <div className="edit-image-container">
          <div className="right-profile">
            <div className="right-profile-image">
              {user.imageUrl && (
                <img src={user.imageUrl} alt="current user profile" />
              )}
            </div>
            <div className="right-profile-description">
              <p className="right-profile-username">{user.userName}</p>
              <span>{user.role}</span>
            </div>
          </div>
          <div className="setting-edit-photo-button-contaner">
            <p>{user.imageUrl ? "change photo" : "add photo"}</p>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => {
                setImageInput(e.target.files[0]);
              }}
              accept="image/*"
            />
          </div>
        </div>

        {error ? (
          <p className="edit-photo-selected-image">{error}</p>
        ) : (
          imageInput && (
            <span className="edit-photo-selected-image">{imageInput.name}</span>
          )
        )}
      </>

      <div className="edit-role-container">
        <p className="setting-section-para">role:</p>
        <div className="input-wrapper">
          <select
            name="role"
            id="role"
            disabled={!editRole}
            onChange={userDetailsUpdateForm.handleChange}
            value={userDetailsUpdateForm.values.role}
          >
            {!user.role && !editRole && (
              <option value="student">No role!</option>
            )}
            <option value="">select a role</option>
            <option value="student">student</option>
            <option value="lecturer">lecturer</option>
            <option value="lecturer">staff</option>
          </select>
          <div className="input-icon">
            <Link
              onClick={() => {
                setEditRole(true);
              }}
              className="setting-edit-button"
            >
              {user.role ? "edit" : "add"}
            </Link>
          </div>
        </div>
        <p className="setting-input-little-description">
          Specify your role in the university for better experience.
        </p>
      </div>

      <div className="edit-bio-container">
        <p className="setting-section-para">bio:</p>
        <div className="input-wrapper">
          <textarea
            name="bio"
            id="bio"
            placeholder={!user.bio && "No bio!"}
            rows={1}
            disabled={!editBio}
            value={userDetailsUpdateForm.values.bio}
            onChange={userDetailsUpdateForm.handleChange}
          ></textarea>
          <div className="input-icon">
            <Link
              onClick={() => setEditBio(true)}
              className="setting-edit-button"
            >
              {user.bio ? "edit" : "add"}
            </Link>
          </div>
        </div>
        <p className="setting-input-little-description">
          Tell us a little about yourself.
        </p>
      </div>

      <div className="edit-website-container">
        <p className="setting-section-para">website:</p>
        <div className="input-wrapper">
          <input
            type="text"
            name="website"
            disabled={!editWebsite}
            placeholder={!user.website && "No website url!"}
            value={userDetailsUpdateForm.values.website}
            onChange={userDetailsUpdateForm.handleChange}
          />
          <div className="input-icon">
            <Link
              onClick={() => setEditWebsite(true)}
              className="setting-edit-button"
            >
              {user.website ? "edit" : "add"}
            </Link>
          </div>
        </div>
        <p className="setting-input-little-description">
          Portfolio / organization / personal website.
        </p>
      </div>
      <button type="submit">
        {loading ? (
          <span className="updating-button">
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            updating...
          </span>
        ) : (
          "update"
        )}
      </button>
    </form>
  );
};

export default UpdateProfile;
