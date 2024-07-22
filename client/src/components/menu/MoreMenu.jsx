import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import themeColorStore from "../../store/themeColor.store";
import { useEffect } from "react";
import authenticatedStore from "../../store/authenticated.store";

const MoreMenu = () => {
    const setIsAuthenticated = authenticatedStore((state) => state.setIsAuthenticated)
    const { theme, setTheme } = themeColorStore();

    const handleUserLogout = () => {
        setIsAuthenticated(false)
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <div className="more-menu-content">
            <ul>
                <li>
                    <Link to={"/setting"}><AiOutlineSetting/> settings</Link>
                </li>
                <li>
                    <Link onClick={setTheme}>{theme === "dark" ? <span> <MdSunny/> light mode</span> : <span><IoMoonSharp/> dark mode</span>}</Link>
                </li>
                <li>
                    <Link onClick={handleUserLogout}><span><BiLogOutCircle/> logout</span></Link>
                </li>
            </ul>
        </div>
    )
}

export default MoreMenu
