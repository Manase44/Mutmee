import Menu from "../../components/menu/Menu";
import './Home.css';
import post from '../../assets/post.jpg'
import profile from '../../assets/profile.jpg'
import { Link } from "react-router-dom";

const Home = () => {
  const posters = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="main-container">
      <aside>
        <Menu />
      </aside>
      <main>
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
                <div className="post-action">...</div>
              </div>
              <div className="post-content">
                <picture>
                  <source />
                  <img src={post} alt="post"/>
                </picture>
              </div>
            </div>


          ))}
        </div>
        <div className="right-content">k</div>
      </main>
    </div>
  )
}

export default Home

