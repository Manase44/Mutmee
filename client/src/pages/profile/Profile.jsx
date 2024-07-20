import './Profile.css';
// import profile from '../../assets/profile.jpg';
import profile from '../../assets/post.jpg';
import { Link } from 'react-router-dom';
import { RxDotsHorizontal } from "react-icons/rx";

const Profile = () => {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className="profile-page-container">
      <div className="user-profile">
        <div className="user-profile-image-section">
          <div className="user-profile-image">
            <img src={profile} alt="user profile" />
          </div>
        </div>
        <div className="user-profile-details">
          <div className="user-profile-header">
            <div className="user-identifier">
              <h3>fikopersempre</h3>
              <span>student</span>
            </div>
            <div className="settings-cta">
              <RxDotsHorizontal />
            </div>
          </div>
          <div className="user-post-following">
            <p><span>0</span>post</p>
            <p><span>0</span>followers</p>
            <p><span>0</span>following</p>
          </div>
          <div className="user-extra-details">
            <h4>bio:</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, quis?</p>
          </div>
          <div className="user-extra-details">
            <h4>website:</h4>
            <Link to={"https://manase.com"} target='_blank'>https://manase.com</Link>
          </div>
          <div className="user-profile-cta">
            <Link>edit profile</Link>
          </div>
        </div>
      </div>
      <div className="user-profile-posts">
        <div className="user-profile-posts-type">
          <ul>
            <li>
              <Link>all</Link>
            </li>
            <li>
              <Link>photos</Link>
            </li>
            <li>
              <Link>videos</Link>
            </li>
            <li>
              <Link>articles</Link>
            </li>
          </ul>
        </div>
        <div className="user-post-container">
          {posts.map((post, i) => (
            <div className="user-post-card">
              <img src={profile} alt="post media" />
              <RxDotsHorizontal className='post-media-type'/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
