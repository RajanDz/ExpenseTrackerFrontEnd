import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthContext } from './context/AuthContext';
import { RegistrationPage } from './pages/RegistrationPage';
import { BudgetHistory } from './pages/BudgetsHistory';
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './layout/NavBar';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { useUser } from './context/AuthContext';

// Stranice koje imaju vlastiti header — Navbar se ne prikazuje
const NO_NAVBAR_PATHS = ['/login', '/registration'];

const AppLayout = () => {
  const { token } = useUser();
  const location = useLocation();

  const showNavbar = !NO_NAVBAR_PATHS.includes(location.pathname) &&
                     !(location.pathname === '/' && !token);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* "/" → Landing za neautorizovane, Dashboard za ulogovane */}
        <Route
          path='/'
          element={token ? <DashboardPage /> : <LandingPage />}
        />

        {/* Zaštićene rute — redirect na "/" ako nema tokena */}
        <Route path='/budgetsHistory' element={
          <ProtectedRoute><BudgetHistory /></ProtectedRoute>
        } />

        {/* Auth stranice */}
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthContext>
      <ToastProvider>
        <Router>
          <AppLayout />
        </Router>
      </ToastProvider>
    </AuthContext>
  );
}

export default App;
