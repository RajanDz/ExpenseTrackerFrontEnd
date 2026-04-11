import { useState } from "react"
import "../style/LoginPage.css"
import { loginUser } from "../services/AuthService";
import { useUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [username,setUsername] = useState("");
    const [password, setPassowrd] = useState("");
    const {setToken} = useUser();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const data = await loginUser(username,password);
            console.log("Successfully logged in!: ", data.jwt)
            setToken(data.jwt);
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    }
    return(
        <div className="login-container">
           <div className="login-content">
                <h2>Login</h2>
                <div className="login-input">
                    <label htmlFor="username-input">Username</label>
                    <input 
                    type="text"
                    placeholder="Type your username"
                    id="username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="login-input">
                    <label htmlFor="password-input">Password</label>
                    <input 
                    type="password"
                    placeholder="Type your password"
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassowrd(e.target.value)}
                    />
                </div>

                <button onClick={handleLogin}>Submit</button>
           </div>
        </div>
    )
}