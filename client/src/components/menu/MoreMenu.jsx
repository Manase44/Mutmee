import { MdHome, MdExplore, MdOutlineAddBox, MdMenu } from "react-icons/md";
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
                    <Link to={"/setting"}>settings</Link>
                </li>
                <li>
                    <Link onClick={setTheme}>theme</Link>
                </li>
                <li>
                    <Link onClick={handleUserLogout}>logout</Link>
                </li>
            </ul>
        </div>
    )
}

export default MoreMenu
