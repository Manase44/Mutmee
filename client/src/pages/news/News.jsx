import { Link } from "react-router-dom";
import { ImNewspaper } from "react-icons/im";
import { LuUser2 } from "react-icons/lu";
import axios from "axios";
import { server_url } from "../../../utils/configurations";
import "./News.css";
import { useEffect, useState } from "react";
import { MdOutlineClose, MdOutlineAccessTime } from "react-icons/md";
import image from "../../assets/post.jpg";
import ViewCoverImageModal from "./ViewCoverImageModal";
import DisplayHtml from "../../components/html/DisplayHtml";
import Readmore from "../../components/readmore/Readmore";

const News = () => {
  const [reading, setReading] = useState(true);
  const [showCoverImage, setShowCoverImage] = useState(false);
  const [allArticles, setAllArticles] = useState([]);

  const handleNavigateToSpecificProfile = () => {
    console.log("The link was clicked");
  };

  const article =
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';

  const gettingAllArticles = async () => {
    try {
      const response = await axios.get(`${server_url}/article`, {
        withCredentials: true,
      });
      console.log(response.data.availableArticles);
      if (response.data.ok) {
        setAllArticles(response.data.availableArticles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const articleOne = allArticles[0];
  console.log(typeof articleOne?.articleContent);

  useEffect(() => {
    gettingAllArticles();
  }, []);

  return (
    <div className="news-section-container">
      <div className="news-headline-section">
        <h3>trending news & aricles</h3>
        <div className="news-headline-container">
          <div className="news-headline-each" onClick={() => setReading(true)}>
            <h4>see how theft has thrived in kiharu</h4>
            <Readmore
              className="text-component"
              text={article}
              maximum={100}
              isButton={false}
            />
            <div className="news-author-published-details">
              <Link className="news-author-profile">
                <div className="news-author-profile-image">
                  <img src={image} alt="suggested profile" />
                </div>
                <div className="news-author-details">
                  <p>fikopersempre</p>
                  <span>student</span>
                </div>
              </Link>
              <span>10m ago</span>
            </div>
          </div>
        </div>
      </div>
      <ViewCoverImageModal
        open={showCoverImage}
        close={() => setShowCoverImage(false)}
        image={image}
      />
      <div className="news-content-display-section">
        {!reading ? (
          <ImNewspaper />
        ) : (
          <div className="news-reading-display">
            <div className="news-reading-display-header">
              <span>reading mode</span>
              <MdOutlineClose onClick={() => setReading(false)} />
            </div>

            <div className="news-reading-display-top-container">
              <div className="news-reading-display-heading">
                <h1>{articleOne?.articleTitle}</h1>
                <ul>
                  <li>
                    <LuUser2 />
                    <span
                      onClick={handleNavigateToSpecificProfile}
                      className="profile-link"
                    >
                      {articleOne?.authorName || "Unknown"}
                    </span>
                  </li>
                  <li>
                    <MdOutlineAccessTime />
                    <span>{new Date().toDateString()}</span>
                  </li>
                </ul>
              </div>

              <div
                className="news-reading-display-image"
                title="click to view image"
                onClick={() => setShowCoverImage(true)}
              >
                <img
                  src={articleOne?.articleImageUrl}
                  width={100}
                  alt="news banner"
                />
              </div>
            </div>

            <div className="news-reading-display-content">
              <DisplayHtml innerHtml={articleOne?.articleContent || ""} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
