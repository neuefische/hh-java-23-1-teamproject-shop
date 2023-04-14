import {createContext, ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {User} from "./model/user";


export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<any>,
    currentUser?: User,
    isLoggedIn: boolean,
    isAdmin: boolean,
    logout: () => void
}>({
    login: () => Promise.resolve(),
    isLoggedIn: false,
    isAdmin: false,
    logout: () => {}
})
export default function UserContext(props: {children: ReactElement}) {

    const [user, setUser] = useState<User>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        setIsLoggedIn(user !== undefined)
        isLoggedIn
            ? setIsAdmin(user?.role === "ADMIN")
            : setIsAdmin(false)
    }, [user])

    function loginUser(username: string, password: string): Promise<void> {
        return axios.post("/api/user", undefined, {auth: {username,password}})
            .then(response => setUser(response.data))
    }

function logout(): void {
        axios.post("/api/user/logout", undefined)
            .then(() => {
                setUser(undefined)
            })
    }

    return (
        <UserProvider.Provider value={{
            login: loginUser,
            currentUser: user,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            logout: logout
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}