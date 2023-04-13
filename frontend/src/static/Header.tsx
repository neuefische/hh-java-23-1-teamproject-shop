import NavigationBar from "./NavigationBar";
import "./Header.css"
import {useNavigate} from "react-router-dom";


export default function Header() {

    const navigate = useNavigate()

    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={"https://openclipart.org/image/800px/298048"} alt={"Logo"}/>
                <h1>Online-Shop</h1>
                <button type={"button"} onClick={() => navigate("/login")}>Login</button>
            </div>
            <NavigationBar/>
        </div>
    )
}