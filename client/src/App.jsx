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
import MainPage from "./pages/main/MainPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Setting from "./pages/setting/Setting";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute children={<MainPage />} />}>
            <Route path="/" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="/post" element={<Post />} />
            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
