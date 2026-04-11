import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const AuthContext = ({ children }) => {
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);

    const handleSetUser = (user) => {
        setUser(user)
    }


    useEffect(() => {
        if (token){
            console.log(`Token: ${token}`)
        }
            
    }, [token])
    return(
        <UserContext.Provider value={{user,handleSetUser,token,setToken}}>
            {children}
        </UserContext.Provider>
    )
}
    export const useUser = () => useContext(UserContext);
