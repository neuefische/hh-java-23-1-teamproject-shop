import NavigationBar from "./NavigationBar";
import "./Header.css"
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserProvider} from "../UserContext";


export default function Header() {

    const navigate = useNavigate()
    const userContext = useContext(UserProvider)

    function onClick() {
        if (userContext.isLoggedIn) {
            userContext.logout()
            navigate("/menu")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={"https://openclipart.org/image/800px/298048"} alt={"Logo"}/>
                <h1>Online-Shop</h1>
                <button type={"button"} onClick={onClick}>{userContext.isLoggedIn ? "Logout" : "Login"}</button>
            </div>
            <NavigationBar/>
        </div>
    )
}

