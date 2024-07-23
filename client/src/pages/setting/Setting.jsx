import { useState } from "react";
import "./Setting.css";
import post from "../../assets/post.jpg";
import { Link } from "react-router-dom";

import themeColorStore from "../../store/themeColor.store";
import authenticatedStore from "../../store/authenticated.store";
import UpdateProfile from "./UpdateProfile";

const Setting = () => {
  const { theme, setTheme } = themeColorStore();
  const setIsAuthenticated = authenticatedStore(
    (state) => state.setIsAuthenticated,
  );
  const [general, setGeneral] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [account, setAccount] = useState(false);

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
              <Link onClick={setTheme}>
                {theme === "dark" ? "change to light" : "change to dark"}
              </Link>
            </div>
          </div>
        ) : editProfile ? (
          <div className="selected-setting-container">
            <h4>edit profile</h4>

            <UpdateProfile />
          </div>
        ) : account ? (
          <div className="selected-setting-container">
            <h4>account setting</h4>

            <div className="setting-logout-container">
              <p className="setting-section-para">logout:</p>
              <Link
                onClick={() => {
                  setIsAuthenticated(false);
                }}
              >
                logout
              </Link>
            </div>
          </div>
        ) : (
          changePassword && (
            <div className="selected-setting-container">
              <h4>password reset</h4>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Setting;
