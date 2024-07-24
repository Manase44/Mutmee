import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import userDetailsStore from "../../store/currentUser.store";
import useRefferedUserStore from "../../store/refferedUserId.store";
import axios from "axios";
import { server_url } from "../../../utils/configurations";

const Home = () => {
  const user = userDetailsStore((state) => state.user);
  const setRefferedUser = useRefferedUserStore(
    (state) => state.setRefferedUser,
  );
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [likedPostId, setLikedPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const navigateToSpecifiedProfile = (username) => {
    if (username == user.userName) {
      navigate("/profile");
    } else {
      setRefferedUser(username);
      navigate(`/user/${username}`);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${server_url}/post`, {
        withCredentials: true,
      });

      if (response.data.ok) {
        const posts = response.data.allPosts;
        setAllPosts(posts.reverse());
        setCommentingPostId(null);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleCommentingForm = useFormik({
    initialValues: {
      postId: "",
      comment: "",
    },
    onSubmit: (data) => {
      data.postId = commentingPostId;
      console.log(data);
    },
  });

  const submitPostLike = async (id) => {
    try {
      if (!id) {
        return navigate("/");
      }
      const response = await axios.post(
        `${server_url}/post/like/${id}`,
        {},
        { withCredentials: true },
      );

      if (response.data.ok) {
        setLikedPosts((prev) => new Set(prev.add(id)));
        setAllPosts((prev) =>
          prev.map((post) =>
            post.postId === id ? { ...post, likes: response.data.likes } : post,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    submitPostLike(likedPostId);
  }, [likedPostId]);

  const suggestions = [1, 2, 3, 4];
  return (
    <>
      <div className="viewing-section">
        {error && <p className="error">{error}</p>}
        {allPosts.map((post, i) => (
          <div className="post-card" key={i}>
            <div className="post-header">
              <div
                className="poster-details"
                onClick={() => {
                  navigateToSpecifiedProfile(post.posterUserName);
                }}
              >
                <div className="poster-profile">
                  {post.posterImageUrl && (
                    <img src={post.posterImageUrl} alt="user profile" />
                  )}
                </div>
                <div className="post-details">
                  <h3 className="poster-username">{post.posterUserName}</h3>
                  <p className="posted-time">30min</p>
                </div>
              </div>
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
                <p>{post.caption}</p>
              </div>
              <div className="home-post-footer">
                <div className="home-post-cta">
                  <ul>
                    <li
                      title="like"
                      onClick={() => setLikedPostId(post.postId)}
                    >
                      <FaRegHeart />
                    </li>
                    <li
                      title="comment"
                      onClick={() => {
                        setCommentingPostId(post.postId);
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
              {commentingPostId === post.postId && (
                <div className="home-post-comment-container">
                  <form onSubmit={handleCommentingForm.handleSubmit}>
                    <textarea
                      name="comment"
                      placeholder="type your comment here"
                      rows={1}
                      value={handleCommentingForm.values.comment}
                      onChange={handleCommentingForm.handleChange}
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
          <Link className="right-profile" to={"/profile"}>
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
        <div>
          <div className="article-suggestions-header">
            <p>See available articles</p>
            <Link to={"/news"}>view all</Link>
          </div>
          {suggestions.map((profile, i) => (
            <div key={i} className="right-content-profile-container">
              <Link className="right-news-highlights">
                <h4>see how theft has thrived in kiharu</h4>
                <p>By fikopersempre</p>
              </Link>
              <div className="right-profile-action">
                <Link>read</Link>
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
