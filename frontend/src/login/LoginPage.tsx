import {useContext, useState} from "react";
import {UserProvider} from "../UserContext";
import {useNavigate} from "react-router-dom";


export default function LoginPage() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const userContext = useContext(UserProvider)

    function onSubmit() {
        userContext.login(username, password)
            .then(() => {navigate("/menu")})
    }

    return (
        <div className={"LoginPage"} onSubmit={onSubmit}>
            <form>
                <label>Benutzername: </label>
                <input type={"text"} placeholder={"Benutzername eingeben"} onChange={e => setUsername(e.target.value)}/>
                <label>Passwort: </label>
                <input type={"password"} placeholder={"Passwort eingeben"} onChange={e => setPassword(e.target.value)}/>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    )
}