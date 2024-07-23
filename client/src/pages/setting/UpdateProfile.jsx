import { useState } from "react";
import userDetailsStore from "../../store/currentUser.store";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
    const user = userDetailsStore((state) => state.user);
    const [editWebsite, setEditWebsite] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const [editRole, setEditRole] = useState(false);
    const [imageInput, setImageInput] = useState(null);
    const [imageLink, setImageLink] = useState(null);

    const userDetailsUpdateForm = useFormik({
        initialValues: {
            imageUrl: user.imageUrl,
            bio: user.bio,
            website: user.website,
            role: user.role,
        },
        onSubmit: (data) => {
            // data.imageUrl = imageLink;
            console.log(data)
        }
    });
    return (
        <form onSubmit={userDetailsUpdateForm.handleSubmit} className="selected-setting-container">
            <>
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
                    <div className="setting-edit-photo-button-contaner">
                        <p>{user.imageUrl ? "change photo" : "add photo"}</p>
                        <input type="file" name="image" id="image" onChange={(e) => { setImageInput(e.target.files[0]) }} accept="image/*" />
                    </div>
                </div>
                {imageInput && <span className="edit-photo-selected-image">{imageInput.name}</span>}
            </>

            <div className="edit-role-container">
                <p className="setting-section-para">role:</p>
                <div className="input-wrapper">
                    <select name="role" id="role" disabled={!editRole} onChange={userDetailsUpdateForm.handleChange} value={userDetailsUpdateForm.values.role}>
                        {!user.role && !editRole && <option value="student">No role!</option>}
                        <option value="">select a role</option>
                        <option value="student">student</option>
                        <option value="lecturer">lecturer</option>
                        <option value="lecturer">staff</option>
                    </select>
                    <div className="input-icon">
                        <Link onClick={() => { setEditRole(true) }} className="setting-edit-button">{user.role ? "edit" : "add"}</Link>
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
                        placeholder={!user.bio && "No bio!"}
                        rows={1}
                        disabled={!editBio}
                        value={userDetailsUpdateForm.values.bio}
                        onChange={userDetailsUpdateForm.handleChange}
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
                        placeholder={!user.website && "No website url!"}
                        value={userDetailsUpdateForm.values.website}
                        onChange={userDetailsUpdateForm.handleChange}
                    />
                    <div className="input-icon">
                        <Link onClick={() => setEditWebsite(true)} className="setting-edit-button">{user.website ? "edit" : "add"}</Link>
                    </div>
                </div>
                <p className="setting-input-little-description">Portfolio / organization / personal website.</p>
            </div>
            <button type="submit">update</button>
        </form>
    )
}

export default UpdateProfile;
