import "./Explore.css";
import post from "../../assets/post.jpg";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { MdExplore, MdOutlineAddBox, MdMenu } from "react-icons/md";
import Footer from "../../components/footer/Footer";

const Explore = () => {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="explore-page-container">
      <div className="explore-posts-container">
        {posts.map((post) => (
          <div className="explore-post-card">
            <div className="explore-post-main-content">
              <img src={profile} alt="post media" />
              <div className="explore-poster-details">
                <Link className="post-details-header">
                  <div className="poster-details-image">
                    <img src={profile} alt="poster-profile" />
                  </div>
                  <p className="poster-details-username">fikopersempre</p>
                </Link>
                <p className="post-details-caption">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores, est.
                </p>
              </div>
            </div>
            <div className="explore-post-cta">
              <ul>
                <li>
                  <MdExplore />
                </li>
                <li>
                  <MdMenu />
                </li>
                <li>
                  <MdOutlineAddBox />
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
