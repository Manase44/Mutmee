import "./Menu.css";
import { NavLink } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.jpg";
import { MdHome, MdExplore, MdOutlineAddBox, MdMenu } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="menu-header-logo">
          <img src={logo} alt="mutmee logo" />
        </div>
        <h1 className="menu-header-text">Mutmee</h1>
      </div>
      <nav>
        <ul className="menu-items">
          <li className="item">
            <NavLink to="/">
              <MdHome />
              <span>home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <MdExplore />
              <span>explore</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/post">
              <MdOutlineAddBox />
              <span>post</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/news">
              <ImNewspaper />
              <span>news</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <div className="menu-profile-container">
                <img src={profile} alt="user profile" />
              </div>
              <span>profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="menu-more-cta">
        <NavLink>
          <MdMenu />
          <span>more</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
