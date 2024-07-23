import "./Menu.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  MdOutlineHome,
  MdOutlineExplore,
  MdOutlineAddBox,
  MdMenu,
} from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { useState } from "react";
import Modal from "../modal/Modal";
import userDetailsStore from "../../store/currentUser.store";
import MoreMenu from "./MoreMenu";

const Menu = () => {
  const user = userDetailsStore((state) => state.user);
  const [show, setShow] = useState(false);

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
              <MdOutlineHome />
              <span>home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <MdOutlineExplore />
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
                {user.imageUrl && (
                  <img src={user.imageUrl} alt="user profile" />
                )}
              </div>
              <span>profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="menu-more-cta">
        <NavLink onClick={() => setShow(true)}>
          <MdMenu />
          <span>more</span>
        </NavLink>
      </div>
      <Modal
        show={show}
        close={() => {
          setShow(false);
        }}
        content={<MoreMenu />}
      />
    </div>
  );
};

export default Menu;
