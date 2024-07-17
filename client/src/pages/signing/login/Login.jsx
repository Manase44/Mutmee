import "../signing.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiSolidUserDetail } from "react-icons/bi";
import { object, string } from "yup";
import logo from "../../../assets/logo-white-background.png";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authUser } from "../../../../utils/firebase.config";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [showPassword, setShowpassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) {
      setShowpassword(false);
    } else {
      setShowpassword(true);
    }
  };

  const handleSigningWithGoole = async () => {
    try {
      const response = await signInWithPopup(authUser, googleProvider);
      console.log(response.user);
    } catch (error) {
      console.log(error);
    }
  };
  const validation = object({
    userName: string().required("username is required"),
    password: string().required("password is required"),
  });

  const signingForm = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="signing-section">
      <div>
        <div className="signing-header">
          <div className="logo-container">
            <img src={logo} alt="mutmee logo" className="mutmee-logo" />
          </div>
          <h1>login</h1>
        </div>
        <form className="signing-form" onSubmit={signingForm.handleSubmit}>
          <div className="form-input">
            <label htmlFor="username">username</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="userName"
                id="username"
                onChange={signingForm.handleChange}
                value={signingForm.values.userName}
                onBlur={signingForm.handleBlur}
              />
              <div className="input-icon">
                <BiSolidUserDetail />
              </div>
            </div>
            {signingForm.touched.userName && signingForm.errors.userName && (
              <p className="error">{signingForm.errors.userName}</p>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="password">password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={signingForm.values.password}
                onChange={signingForm.handleChange}
                onBlur={signingForm.handleBlur}
              />
              <div className="input-icon" onClick={handleShowPassword}>
                {showPassword ? <GoEyeClosed /> : <GoEye />}
              </div>
            </div>
            {signingForm.touched.password && signingForm.errors.password && (
              <p className="error">{signingForm.errors.password}</p>
            )}
          </div>
          <p className="form-small-text forgot">
            <Link>Forgot password?</Link>
          </p>
          <button type="submit">login</button>
          <p className="form-small-text">
            Don't have Mutmee account? <Link to={"/register"}>Creat one</Link>
          </p>
        </form>
        <div className="or">
          <span>or</span>
        </div>
        <div className="third-party-signing-container">
          <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
          <Link onClick={handleSigningWithGoole}>continue with google</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
