import {NavLink} from "react-router-dom";
import "./NavigationBar.css"


export default function NavigationBar() {
    return (
        <div className={"NavigationBar"}>
            <NavLink className={"NavigationItem"} to={"/home"}>Home</NavLink>
            <NavLink className={"NavigationItem"} to={"/menu"}>Menü</NavLink>
            <NavLink className={"NavigationItem"} to={"/order"}>Bestellen</NavLink>
            <NavLink className={"NavigationItem"} to={"/add"}>Formular</NavLink>
        </div>
    )
}