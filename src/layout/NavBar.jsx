import { useNavigate } from 'react-router-dom'
import "../style/NavBar.css"
import { useUser } from '../context/AuthContext'
import { getUser } from '../services/AuthService'
import { useEffect } from 'react'
export const Navbar = () => {
  const navigate = useNavigate()
  const {user,token, handleSetUser} = useUser();

  const handleGetUser = async () => {
        try {
            const data = await getUser(token);
            console.log(data);
            handleSetUser(data);
        } catch (error) {
            console.error(error.message);
        }
  }

  useEffect(() => {
    handleGetUser();
  },[token])
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>ExpenseTracker</span>
      </div>

      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/expenses">Expenses</a>
        <a href="/analytics">Analytics</a>
      </div>

      <div className="navbar-user">
        {user ? (
            <>  
            <span>{user}</span>
            <button >Logout</button>
            </>
        ):(
            <>
            <span onClick={() => navigate('/login')}>Sign in</span>
            <span onClick={() => navigate('/registration')}>Create account</span>
            </>
        )}
      </div>
    </nav>
  )
}