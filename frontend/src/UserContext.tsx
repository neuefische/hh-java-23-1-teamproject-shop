import {createContext, ReactElement, useState} from "react";
import axios from "axios";
import {User} from "./model/user";


export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<void>
}>({
    login: () => Promise.resolve()
})
export default function UserContext(props: {children: ReactElement}) {
    const [user, setUser] = useState<User>()

    function loginUser(username: string, password: string): Promise<void> {
        axios.post("/api/user", undefined, {auth: {username,password}})
            .then(response => setUser(response.data))
        return Promise.resolve()
    }

function logout(){
        return axios.post("/api/user/logout")
            .then(() => {
                setUser(undefined)
            })
return {logout}
    }

    return (
        <UserProvider.Provider value={{
            login: loginUser
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}