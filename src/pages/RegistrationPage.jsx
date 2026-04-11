
import { useState } from "react";
import "../style/Registration.css"
import { registerUser } from "../services/AuthService";

export const RegistrationPage = () => {
    const inputs = [
        {label: 'Name', name: 'name'},
        { label: 'Lastname', name: 'lastname' },
        { label: 'Username', name: 'username' },
        { label: 'Email', name: 'email' },
        { label: 'Password', name: 'password' },
    ];

      const [form, setForm] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (input,e) => {
        setForm({...form,[input] : e.target.value})
    }


    const handleSignUp = async () => {
       const data = await registerUser(form); 
       console.log("Data: ", data)
    }

    return(
        <div className="registration-container">
            <div className="registration-content">
                    <h2>Registration section</h2>
                    {inputs.map(input => (
                        <div className="reg-input" key={input.name}>
                            <label htmlFor={input.name}>{input.label}</label>
                            <input 
                                type={input.name === 'password' ? 'password': 'text'}
                                placeholder="Type your password"
                                id="password-input"
                                value={form[input.name]}
                                onChange={(e) => handleChange(input.name,e)}
                            />
                        </div>
                    ))}
                    <button className="reg-button" onClick={handleSignUp}>Submit</button>
            </div>
        </div>
    )
}