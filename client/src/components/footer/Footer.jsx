import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <p>
        &copy; {new Date().getFullYear()} mutmee by{" "}
        <Link target="_blank" to={"https://www.linkedin.com/in/manasegunga/"}>
          gunga
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
