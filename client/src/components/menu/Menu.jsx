import './Menu.css'
import { NavLink } from 'react-router-dom';
import { BiSolidUserDetail } from "react-icons/bi";
import logo from '../../assets/logo.png'

const Menu = () => {
  return (
    <div className='menu-container'>
      <div className="menu-header">
        <div className="menu-header-logo">
          <img src={logo} alt="mutmee logo" />
        </div>
        <h1 className="menu-header-text">Mutmee</h1>
      </div>
      <nav>
        <ul className="menu-items">
          <li className='item'>
            <NavLink to="/home">
              <BiSolidUserDetail />
              <span>home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <BiSolidUserDetail />
              <span>explore</span></NavLink>
          </li>
          <li>
            <NavLink to="/post"><BiSolidUserDetail />
              <span>post</span></NavLink>
          </li>
          <li>
            <NavLink to="/news"><BiSolidUserDetail />
              <span>news</span></NavLink>
          </li>
          <li>
            <NavLink to="/profile"><BiSolidUserDetail />
              <span>profile</span></NavLink>
          </li>
        </ul>
      </nav>
      <div className='menu-more-cta'>
        <NavLink>
          <BiSolidUserDetail />
          <span>more</span></NavLink>
      </div>
    </div>
  )
}

export default Menu;
