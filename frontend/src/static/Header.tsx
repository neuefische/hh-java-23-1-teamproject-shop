import NavigationBar from "./NavigationBar";
import "./Header.css"


export default function Header() {
    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={"https://openclipart.org/image/800px/298048"} alt={"Logo"}/>
                <h1>Online-Shop</h1>
            </div>
            <NavigationBar/>
        </div>
    )
}