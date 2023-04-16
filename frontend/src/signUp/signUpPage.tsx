import {FormEvent, useContext, useState} from "react";
import {UserProvider} from "../UserContext";
import {useNavigate} from "react-router-dom";
import "./signUpPage.css"


export default function SignUpPage() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const userContext = useContext(UserProvider)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        userContext.signup(username, password)
            .then(() => {navigate("/menu")})
    }


    return (
        <div className={"signUpPage"}>
            <form onSubmit={onSubmit}>
                <label>Benutzername: </label>
                <input type={"text"} placeholder={"Benutzername festlegen"} onChange={e => setUsername(e.target.value)}/>
                <label>Passwort: </label>
                <input type={"password"} placeholder={"Passwort festlegen"} onChange={e => setPassword(e.target.value)}/>
                <button type={"submit"}>Benutzer erstellen</button>
            </form>
        </div>
    )
}