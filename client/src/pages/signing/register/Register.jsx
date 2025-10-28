import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-white-background.png";
import { useFormik } from "formik";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authUser } from "../../../../utils/firebase.config";
import { object, string, ref } from "yup";
import axios from "axios";
import { server_url } from "../../../../utils/configurations";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmassword, setShowConfirmpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const handleShowConfirmPassword = () => {
    if (showConfirmassword) {
      setShowConfirmpassword(false);
    } else {
      setShowConfirmpassword(true);
    }
  };

  const handleRegisterUser = async (data) => {
    setLoading(true);
    try {
      console.log(server_url)
      const response = await axios.post(`${server_url}/user/register`, data);
      if (response.data.ok) {
        setError(null);
        toast(response.data.message, {
          theme: "success",
          duration: 4000,
          position: "top-right",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
    emailAddress: string()
      .email("invalid email address")
      .required("email address is required"),
    userName: string().required("username is required"),
    password: string()
      .required("password is required")
      .min(8, "must have atleast 8 characters")
      .max(25, "must have at most 25 characters"),
    confirmPassword: string()
      .required("confirming password is required")
      .oneOf([ref("password")], "passwords must match"),
  });

  const signingForm = useFormik({
    initialValues: {
      emailAddress: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validation,
    onSubmit: (data) => {
      handleRegisterUser(data);
    },
  });

  return (
    <div className="signing-section">
      <div>
        <div className="signing-header">
          <div className="logo-container">
            <img src={logo} alt="mutmee logo" className="mutmee-logo" />
          </div>
          <h1>register</h1>
        </div>
      </div>
      <form className="signing-form" onSubmit={signingForm.handleSubmit}>
        <div className="form-input">
          <label htmlFor="email">email address</label>
          <div className="input-wrapper">
            <input
              type="email"
              name="emailAddress"
              id="email"
              onChange={signingForm.handleChange}
              value={signingForm.values.emailAddress}
              onBlur={signingForm.handleBlur}
            />
            <div className="input-icon">
              <HiOutlineMail />
            </div>
          </div>
          {signingForm.touched.emailAddress &&
            signingForm.errors.emailAddress && (
              <p className="error">{signingForm.errors.emailAddress}</p>
            )}
        </div>
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
        <div className="form-input">
          <label htmlFor="cpassword">confirm password</label>
          <div className="input-wrapper">
            <input
              type={showConfirmassword ? "text" : "password"}
              name="confirmPassword"
              id="cpassword"
              value={signingForm.values.confirmPassword}
              onChange={signingForm.handleChange}
              onBlur={signingForm.handleBlur}
            />
            <div className="input-icon" onClick={handleShowConfirmPassword}>
              {showConfirmassword ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>
          {signingForm.touched.confirmPassword &&
            signingForm.errors.confirmPassword && (
              <p className="error">{signingForm.errors.confirmPassword}</p>
            )}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "please wait..." : "register"}
        </button>
        <p className="form-small-text">
          Already have Mutmee account? <Link to={"/"}>Login</Link>
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
  );
};

export default Register;
