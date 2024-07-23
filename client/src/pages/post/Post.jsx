import "./Post.css";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import {
  cloud_name,
  server_url,
  upload_preset,
} from "../../../utils/configurations";
import axios from "axios";
import { FaPhotoVideo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";

const Post = () => {
  const [media, setMedia] = useState(true);
  const [article, setArticle] = useState(false);
  const [imageInput, setImageInput] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlGenerating, setImageUrlGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    setImageUrlGenerating(true);
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
        setImageUrl(
          secureUrl.replace("/upload", "/upload/w_400/f_auto/q_auto"),
        );
      }
    } catch (error) {
      setError("uploading failed!");
    } finally {
      setImageUrlGenerating(false);
    }
  };

  const submitPost = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${server_url}/post`, data, {
        withCredentials: true,
      });
      if (response.data.ok) {
        toast(response.data.message, {
          theme: "success",
          duration: 4000,
          position: "top-right",
        });
        navigate("/post");
        setImageInput(null);
        setImageUrl(null);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostForm = useFormik({
    initialValues: {
      mediaUrl: "",
      mediaType: "",
      caption: "",
    },
    onSubmit: (data) => {
      data.mediaUrl = imageUrl;
      data.mediaType = imageInput.type;
      submitPost(data);
    },
  });

  return (
    <div className="post-container">
      <div className="upload-post-card">
        <div className="post-card-header">
          <h3>create new post</h3>
          <ul className="post-card-options">
            <li>
              <Link
                className={media && "post-card-active-option"}
                onClick={() => {
                  setMedia(true);
                  setArticle(false);
                  setError(null);
                  setImageInput(null);
                }}
              >
                media
              </Link>
            </li>
            <li>
              <Link
                className={article && "post-card-active-option"}
                onClick={() => {
                  setMedia(false);
                  setArticle(true);
                  setError(null);
                  setImageInput(null);
                }}
              >
                article
              </Link>
            </li>
          </ul>
        </div>
        {media ? (
          <>
            <div className="media-preview">
              {imageUrl ? (
                <img src={imageUrl} alt="choosen media" />
              ) : imageInput ? (
                <div className="image-preview-text">
                  <p>
                    click <strong>ok</strong> to upload:
                  </p>
                  <p>{imageInput.name}</p>
                </div>
              ) : (
                <FaPhotoVideo />
              )}
            </div>
            {imageUrl ? (
              <div className="caption-container">
                <div className="caption-container-header">
                  <h4>caption:</h4>
                </div>
                <form onSubmit={handlePostForm.handleSubmit}>
                  <div className="caption-input">
                    <textarea
                      name="caption"
                      id="caption"
                      rows={2}
                      value={handlePostForm.values.caption}
                      onChange={handlePostForm.handleChange}
                    ></textarea>
                  </div>
                  {error && <p className="error">{error}</p>}
                  <button type="submit">
                    {loading ? (
                      <>
                        <Oval
                          visible={true}
                          height="15"
                          width="15"
                          color="#4fa94d"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />{" "}
                        <span>posting...</span>{" "}
                      </>
                    ) : (
                      "post"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="media-input">
                <div className="media-input-cta">
                  <div className="illusion-button">choose media</div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      setImageInput(e.target.files[0]);
                    }}
                  />
                </div>
                <button
                  disabled={imageUrlGenerating}
                  onClick={handleUploadImage}
                  className="post-ok-btn"
                >
                  {imageUrlGenerating && (
                    <Oval
                      visible={true}
                      height="15"
                      width="15"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                  ok
                </button>
                {error && <p className="error">{error}</p>}
              </div>
            )}
          </>
        ) : (
          article && (
            <div>
              <form></form>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Post;
