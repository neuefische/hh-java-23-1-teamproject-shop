import {NavLink} from "react-router-dom";
import "./NavigationBar.css"
import {useContext} from "react";
import {UserProvider} from "../UserContext";


export default function NavigationBar() {

    const userContext = useContext(UserProvider)

    return (
        <div className={"NavigationBar"}>
            <NavLink className={"NavigationItem"} to={"/menu"}>Menü</NavLink>
            <NavLink className={"NavigationItem"} to={"/order"}>Bestellen</NavLink>
            {userContext.isAdmin && <NavLink className={"NavigationItem"} to={"/add"}>Hinzufügen</NavLink>}
        </div>
    )
}