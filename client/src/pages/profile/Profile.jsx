import "./Profile.css";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import Footer from "../../components/footer/Footer";
import userDetailsStore from "../../store/currentUser.store";
import axios from 'axios'
import { server_url } from "../../../utils/configurations";
import { useEffect, useState } from "react";

const Profile = () => {
  const user = userDetailsStore((state) => state.user);

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState([])


  const getUserPosts = async (userId) => {
    setFetching(true)
    try {
      const response = await axios.get(`${server_url}/post/user/${userId}`, {withCredentials:true})
      
      if (response.data.ok) {
        setError(null);
        setUserPosts(response.data.userPosts)
      }
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    getUserPosts(user.userId)
  }, []);


  return (
    <div className="profile-page-container">
      <div className="user-profile">
        <div className="user-profile-image-section">
          <div className="user-profile-image">
            {user.imageUrl && <img src={user.imageUrl} alt="user profile" />}
          </div>
        </div>
        <div className="user-profile-details">
          <div className="user-profile-header">
            <div className="user-identifier">
              <h3>{user.userName}</h3>
              <span>{user.role}</span>
            </div>
            <div className="settings-cta">
              <Link to={"/setting"}>
                <RxDotsHorizontal />
              </Link>
            </div>
          </div>
          <div className="user-post-following">
            <p>
              <span>0</span>post
            </p>
            <p>
              <span>0</span>followers
            </p>
            <p>
              <span>0</span>following
            </p>
          </div>
          {user.bio && <div className="user-extra-details">
            <h4>bio:</h4>
            <p>
              {user.bio}
            </p>
          </div>}
          {user.website && <div className="user-extra-details">
            <h4>website:</h4>
            <Link to={`${user.website}`} target="_blank">
              {user.website}
            </Link>
          </div>}
          <div className="user-profile-cta">
            <Link to={"/setting"}>edit profile</Link>
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
        {fetching ? <p className="user-post-container-message">Getting your posts...</p> :
          error ? <p className="user-post-container-message error">{error}</p> :
            <div className="user-post-container">
              {userPosts && userPosts.map((post, i) => (
                <div className="user-post-card" key={i}>
                  <img src={post.mediaUrl} alt="post media" />
                  <RxDotsHorizontal className="post-media-type" />
                </div>
              ))}
            </div>}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
