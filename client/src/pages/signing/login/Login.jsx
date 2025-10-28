import "../signing.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiSolidUserDetail } from "react-icons/bi";
import { object, string } from "yup";
import logo from "../../../assets/logo-white-background.png";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authUser } from "../../../../utils/firebase.config";
import axios from "axios";
import { server_url } from "../../../../utils/configurations";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";
import authenticatedStore from "../../../store/authenticated.store";
import userDetailsStore from "../../../store/currentUser.store";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const setIsAuthenticated = authenticatedStore(
    (state) => state.setIsAuthenticated,
  );
  const setUser = userDetailsStore((state) => state.setUser);
  const [showPassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    if (showPassword) {
      setShowpassword(false);
    } else {
      setShowpassword(true);
    }
  };

  const handleUserLogin = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${server_url}/user/login`, data, {
        withCredentials: true,
      });
      console.log(response)
      if (response.data.ok) {
        const user = {
          userId: response.data.user.userId,
          userName: response.data.user.userName,
          role: response.data.user.role,
          imageUrl: response.data.user.imageUrl,
          bio: response.data.user.bio,
          website: response.data.user.website,
        };

        setUser(user);

        setIsAuthenticated(true);
        setError(null);
        toast(response.data.message, {
          theme: "success",
          duration: 4000,
          position: "top-right",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data.message);
    } finally {
      setLoading(false);
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
    password: string()
      .required("password is required")
      .min(8, "must have atleast 8 characters")
      .max(25, "must have at most 25 characters"),
  });

  const signingForm = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (data) => {
      handleUserLogin(data);
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
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "please wait..." : "login"}
          </button>
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
