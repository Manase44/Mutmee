import "./Home.css";
import post from "../../assets/post.jpg";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useFormik } from "formik";
import userDetailsStore from "../../store/currentUser.store";

const Home = () => {
  const user = userDetailsStore((state) => state.user);
  const [commenting, setCommenting] = useState(false);

  const handleCommentingForm = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (data) => {
      console.log(data);
      setCommenting(false);
    },
  });

  
  const suggestions = [1, 2, 3, 4];
  const posters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div className="viewing-section">
        {posters.map((poster, i) => (
          <div className="post-card" key={i}>
            <div className="post-header">
              <Link className="poster-details">
                <div className="poster-profile">
                  <img src={profile} alt="user profile" />
                </div>
                <div className="post-details">
                  <h3 className="poster-username">fikopersempre</h3>
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
                <img src={post} alt="post" />
              </picture>
            </div>
            <div className="home-post-details">
              <div className="home-post-caption">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequuntur, quod!
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
                  <span>0</span>
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
