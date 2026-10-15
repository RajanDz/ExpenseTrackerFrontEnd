import { createContext, useContext, useState } from "react"

const UserContext = createContext()

export const AuthContext = ({ children }) => {
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(() => localStorage.getItem('token'));

    const handleSetUser = (user) => {
        setUser(user)
    }

    const handleSetToken = (newToken) => {
        setToken(newToken);
        if (newToken){
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    }

    return(
        <UserContext.Provider value={{user,handleSetUser,token,handleSetToken}}>
            {children}
        </UserContext.Provider>
    )
}
    export const useUser = () => useContext(UserContext);
