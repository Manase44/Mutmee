import "./Explore.css";
import post from "../../assets/post.jpg";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { server_url } from "../../../utils/configurations";

const Explore = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);

  const shuffle = (array) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server_url}/post`, {
        withCredentials: true,
      });
      if (response.data.ok) {
        setError(null);
        const posts = response.data.allPosts;
        const availablePosts = shuffle(posts);
        setAllPosts(availablePosts);
      }
    } catch (error) {
      setError(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="explore-page-container">
      <div className="explore-posts-container">
        {error && <p className="error">{error}</p>}
        {allPosts.map((post) => (
          <div className="explore-post-card">
            <div className="explore-post-main-content">
              <img src={post.mediaUrl} alt="post media" />
              <div className="explore-poster-details">
                <Link className="post-details-header">
                  <div className="poster-details-image">
                    <img src={post.posterImageUrl} alt="poster-profile" />
                  </div>
                  <p className="poster-details-username">
                    {post.posterUserName}
                  </p>
                </Link>
                <p className="post-details-caption">{post.caption}</p>
              </div>
            </div>
            <div className="explore-post-cta">
              <ul>
                <li>
                  <FaRegCommentDots />
                </li>
                <li>
                  <FaRegHeart />
                </li>
                <li>
                  <PiShareFatBold />
                </li>
              </ul>
            </div>
          </div>
        ))}
        <Footer />
      </div>
    </div>
  );
};

export default Explore;
