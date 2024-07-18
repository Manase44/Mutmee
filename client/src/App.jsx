import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./pages/notfound/Notfound";
import Login from "./pages/signing/login/Login";
import Register from "./pages/signing/register/Register";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import News from "./pages/news/News";
import Post from "./pages/post/Post";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./components/proctedRoute/ProtectedRoute";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainPage/>}>
            <Route path="/home" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="/post" element={<Post />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
