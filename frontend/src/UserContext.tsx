import {createContext, ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {User} from "./model/user";


export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<void>,
    currentUser?: User,
    isLoggedIn: boolean,
    logout: () => void
}>({
    login: () => Promise.resolve(),
    isLoggedIn: false,
    logout: () => {}
})
export default function UserContext(props: {children: ReactElement}) {

    const [user, setUser] = useState<User>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => setIsLoggedIn(user !== undefined), [user])

    function loginUser(username: string, password: string): Promise<void> {
        axios.post("/api/user", undefined, {auth: {username,password}})
            .then(response => setUser(response.data))
        return Promise.resolve()
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
            logout: logout
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}