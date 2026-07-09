import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthContext } from './context/AuthContext';
import { RegistrationPage } from './pages/RegistrationPage';
import { BudgetHistory } from './pages/BudgetsHistory';
import { Navbar } from './layout/NavBar';
function App() {
  return (
    <AuthContext>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<DashboardPage/>}></Route>
          <Route path='/registration' element={<RegistrationPage/>} ></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/budgetsHistory' element={<BudgetHistory/>}></Route>
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
