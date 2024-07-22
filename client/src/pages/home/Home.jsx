import "./Home.css";
import post from "../../assets/post.jpg";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import userDetailsStore from "../../store/currentUser.store";
import axios from 'axios';
import { server_url } from "../../../utils/configurations";

const Home = () => {
  const user = userDetailsStore((state) => state.user);
  const [commenting, setCommenting] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async() => {
    try {
      const response = await axios.get(`${server_url}/post`, {withCredentials:true})
      console.log(response)
      if (response.data.ok) {
        setAllPosts(response.data.allPosts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentingForm = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (data) => {
      console.log(data);
      setCommenting(false);
    },
  });

  useEffect(() => {
    fetchAllPosts();
  }, [])
  
  const suggestions = [1, 2, 3, 4];
  return (
    <>
      <div className="viewing-section">
        {allPosts.map((post, i) => (
          <div className="post-card" key={i}>
            <div className="post-header">
              <Link className="poster-details">
                <div className="poster-profile">
                 {post.posterImageUrl && <img src={post.posterImageUrl} alt="user profile" />}
                </div>
                <div className="post-details">
                  <h3 className="poster-username">{post.posterUserName}</h3>
                  <p className="posted-time">30min</p>
                </div>
              </Link>
              <div className="post-action">
                <RxDotsHorizontal />
              </div>
            </div>
            <div className="post-content">
              <picture>
                <source />
                <img src={post.mediaUrl} alt="post" />
              </picture>
            </div>
            <div className="home-post-details">
              <div className="home-post-caption">
                <p>
                  {post.caption}
                </p>
              </div>
              <div className="home-post-footer">
                <div className="home-post-cta">
                  <ul>
                    <li title="like">
                      <FaRegHeart />
                    </li>
                    <li
                      title="comment"
                      onClick={() => {
                        setCommenting(true);
                      }}
                    >
                      <FaRegCommentDots />
                    </li>
                    <li title="share">
                      <PiShareFatBold />
                    </li>
                  </ul>
                </div>
                <div className="home-post-likes">
                  <span>{post.likes}</span>
                  <p>likes</p>
                </div>
              </div>
              {commenting && (
                <div className="home-post-comment-container">
                  <form onSubmit={handleCommentingForm.handleSubmit}>
                    <textarea
                      name="postComment"
                      id="postComment"
                      placeholder="type your comment here"
                      rows={1}
                    ></textarea>
                    <button type="submit">comment</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="right-content">
        <div className="right-content-profile-container">
          <Link className="right-profile">
            <div className="right-profile-image">
              {user.imageUrl && <img src={user.imageUrl} alt="user profile" />}
            </div>
            <div className="right-profile-description">
              <p className="right-profile-username">{user.userName}</p>
              <span>{user.role}</span>
            </div>
          </Link>
          <div className="right-profile-action">
            <Link>switch</Link>
          </div>
        </div>
        <div className="right-content-follow-suggestions">
          <div className="follow-suggestions-header">
            <p>You may like this</p>
            <Link>view all</Link>
          </div>
          {suggestions.map((profile, i) => (
            <div key={i} className="right-content-profile-container">
              <Link className="right-profile">
                <div className="right-profile-image">
                  <img src={post} alt="suggested profile" />
                </div>
                <div className="right-profile-description">
                  <p className="right-profile-username">fikopersempre</p>
                  <span>student</span>
                </div>
              </Link>
              <div className="right-profile-action">
                <Link>follow</Link>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
