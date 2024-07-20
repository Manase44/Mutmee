import { useState } from 'react';
import './Setting.css';
import post from '../../assets/post.jpg'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

const Setting = () => {
  const [general, setGeneral] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [account, setAccount] = useState(false);
  const [image, setImage] = useState(false);
  const [editWebsite, setEditWebsite] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [role, setRole] = useState(false);
  const [bio, setBio] = useState(false);
  const [website, setWebsite] = useState(false);
  const [phone, setPhone] = useState(false);




  const userDetailsUpdateForm = useFormik({
    initialValues: {
      imageUrl: "",
      bio: "",
      website: "",
      phoneNumber: "",
      role: ""
    }
  })
  return (
    <div className='setting-page-container'>
      <div className="setting-menu">
        <h3>settings</h3>
        <ul>
          <li>
            <Link onClick={() => { setEditProfile(false), setChangePassword(false); setGeneral(true); setAccount(false) }} className={general && "active-setting-link"}>general</Link>
          </li>
          <li>
            <Link onClick={() => { setEditProfile(true), setChangePassword(false); setGeneral(false); setAccount(false) }} className={editProfile && "active-setting-link"}>edit profile</Link>
          </li>
          <li>
            <Link onClick={() => { setEditProfile(false), setChangePassword(false); setGeneral(false); setAccount(true) }} className={account && "active-setting-link"}>account</Link>
          </li>
          <li>
            <Link onClick={() => { setEditProfile(false), setChangePassword(true); setGeneral(false); setAccount(false) }} className={changePassword && "active-setting-link"}>change password</Link>
          </li>
        </ul>
      </div>
      <div className="selected-setting">
        {general ?
          <div className="selected-setting-container">
            <h4>general settings</h4>

          </div>
          : editProfile ?
            <div className="selected-setting-container">
              <h4>edit profile</h4>

              <div className="edit-image-container">
                <div className="right-profile">
                  <div className="right-profile-image">
                    <img src={post} alt="suggested profile" />
                  </div>
                  <div className="right-profile-description">
                    <p className="right-profile-username">fikopersempre</p>
                    <span>student</span>
                  </div>
                </div>
                <button>{image ? "change photo" : "add photo"}</button>
              </div>

              <div className="edit-role-container">
                <p>specify your role in the university for better experience</p>
              </div>

              <div className="edit-bio-container">
                <p>bio:</p>
                <div className="input-wrapper">
                  <textarea name="bio" id="bio" value={!bio ? "No bio!" :bio} rows={1} disabled={!editBio}></textarea>
                  <div className="input-icon">
                    <Link onClick={() => setEditBio(true)}>edit</Link>
                  </div>
                </div>
              </div>


              <div className="edit-website-container">
                <p>website:</p>
                <div className="input-wrapper">
                  <input type="text" name="websiteUrl" id="websiteUrl" disabled={!editWebsite} value={"https://manase.com"} />
                  <div className="input-icon">
                    <Link onClick={() => setEditWebsite(true)}>edit</Link>
                  </div>
                </div>
              </div>

              <button>update</button>

            </div>
            : changePassword &&
            <div className="selected-setting-container">
              <h4>password reset</h4>

            </div>
        }
      </div>
    </div>
  )
}

export default Setting;
