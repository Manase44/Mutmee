import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./pages/notfound/Notfound";
import Login from "./pages/signing/login/Login";
import Register from "./pages/signing/register/Register";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
