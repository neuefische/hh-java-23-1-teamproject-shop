import {createContext, ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {User} from "./model/user";
import {toast} from "react-toastify";


export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<any>,
    currentUser?: User,
    isLoggedIn: boolean,
    isAdmin: boolean,
    logout: () => void
    signup: (username: string, password: string) => Promise<any>
}>({
    login: () => Promise.resolve(),
    isLoggedIn: false,
    isAdmin: false,
    logout: () => {
    },
    signup: () => Promise.resolve()
})
export default function UserContext(props: { children: ReactElement }) {

    const [user, setUser] = useState<User>()
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        setIsLoggedIn(user !== undefined)
        isLoggedIn
            ? setIsAdmin(user?.role === "ADMIN")
            : setIsAdmin(false)
    }, [user])

    function loginUser(username: string, password: string): Promise<void> {
        return axios.post("/api/user", undefined, {auth: {username, password}})
            .then(response => setUser(response.data))
    }

    function logout(): void {
        axios.post("/api/user/logout", undefined)
            .then(() => {
                setUser(undefined)
            })
    }

    function signUp(username: string, password: string) {
        return axios.post("/api/user/signup", {username, password})
            .then(response => {
                setUsername(username)
                setPassword(password)

            })
            .catch(() => toast.error("SignUp failed!"))
    }

    return (
        <UserProvider.Provider value={{
            login: loginUser,
            currentUser: user,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            logout: logout,
            signup: signUp
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}