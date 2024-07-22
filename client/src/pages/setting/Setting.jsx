import { useState } from "react";
import "./Setting.css";
import post from "../../assets/post.jpg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import themeColorStore from "../../store/themeColor.store";
import userDetailsStore from "../../store/currentUser.store";
import authenticatedStore from "../../store/authenticated.store";

const Setting = () => {
  const { theme, setTheme } = themeColorStore();
  const user = userDetailsStore((state) => state.user);
  const setIsAuthenticated = authenticatedStore((state) => state.setIsAuthenticated)
  const [general, setGeneral] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [account, setAccount] = useState(false);
  const [editWebsite, setEditWebsite] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editRole, setEditRole] = useState(false);

  const userDetailsUpdateForm = useFormik({
    initialValues: {
      imageUrl: "",
      bio: "",
      website: "",
      phoneNumber: "",
      role: "",
    },
  });
  return (
    <div className="setting-page-container">
      <div className="setting-menu">
        <h3>settings</h3>
        <ul>
          <li>
            <Link
              onClick={() => {
                setEditProfile(false), setChangePassword(false);
                setGeneral(true);
                setAccount(false);
              }}
              className={general && "active-setting-link"}
            >
              general
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setEditProfile(true), setChangePassword(false);
                setGeneral(false);
                setAccount(false);
              }}
              className={editProfile && "active-setting-link"}
            >
              edit profile
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setEditProfile(false), setChangePassword(false);
                setGeneral(false);
                setAccount(true);
              }}
              className={account && "active-setting-link"}
            >
              account
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setEditProfile(false), setChangePassword(true);
                setGeneral(false);
                setAccount(false);
              }}
              className={changePassword && "active-setting-link"}
            >
              change password
            </Link>
          </li>
        </ul>
      </div>
      <div className="selected-setting">
        {general ? (
          <div className="selected-setting-container">
            <h4>general settings</h4>

            <div className="toggle-theme-container">
              <p className="setting-section-para">change theme:</p>
              <Link onClick={setTheme}>{theme === "dark" ? "change to light" : "change to dark"}</Link>
            </div>
          </div>
        ) : editProfile ? (
          <div className="selected-setting-container">
            <h4>edit profile</h4>

            <form onSubmit={userDetailsUpdateForm.handleSubmit} className="selected-setting-container">
            <div className="edit-image-container">
              <div className="right-profile">
                <div className="right-profile-image">
                  {user.imageUrl && <img src={user.imageUrl} alt="current user profile" />}
                </div>
                <div className="right-profile-description">
                  <p className="right-profile-username">{user.userName}</p>
                  <span>{user.role}</span>
                </div>
              </div>
              <button>{user.imageUrl ? "change photo" : "add photo"}</button>
            </div>

            <div className="edit-role-container">
              <p className="setting-section-para">role:</p>
              <div className="input-wrapper">
                <input type="text" name="role" id="role" value={user.role ? user.role : "No role specified!"} disabled={!editRole} />
                <div className="input-icon">
                  <Link onClick={() => { setEditRole(true) }} className="setting-edit-button">{user.role ?"edit" : "add"}</Link>
                </div>
              </div>
              <p className="setting-input-little-description">Specify your role in the university for better experience.</p>
            </div>

            <div className="edit-bio-container">
              <p className="setting-section-para">bio:</p>
              <div className="input-wrapper">
                <textarea
                  name="bio"
                  id="bio"
                  value={user.bio ? user.bio : "No bio!"}
                  rows={1}
                  disabled={!editBio}
                ></textarea>
                <div className="input-icon">
                  <Link onClick={() => setEditBio(true)} className="setting-edit-button">{user.bio ? "edit" : "add"}</Link>
                </div>
              </div>
              <p className="setting-input-little-description">Tell us a little about yourself.</p>
            </div>

            <div className="edit-website-container">
              <p className="setting-section-para">website:</p>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="websiteUrl"
                  id="websiteUrl"
                  disabled={!editWebsite}
                  value={user.website ? user.website : "No website url!"}
                />
                <div className="input-icon">
                  <Link onClick={() => setEditWebsite(true)} className="setting-edit-button">{user.website ?"edit" : "add"}</Link>
                </div>
              </div>
              <p className="setting-input-little-description">Portfolio / organization / personal website.</p>
            </div>
            <button type="submit">update</button>
            </form>
            
            
          </div>
        ) : account ? (
          <div className="selected-setting-container">
            <h4>account setting</h4>

            <div className="setting-logout-container">
            <p className="setting-section-para">logout:</p>
            <Link onClick={() => {setIsAuthenticated(false)}}>logout</Link>
            </div>
          </div>

        ) : changePassword && (
          <div className="selected-setting-container">
            <h4>password reset</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
