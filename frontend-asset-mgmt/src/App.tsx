import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';


import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import UpdatesPage from './Pages/UpdatesPage';
import AddAssetPage from './Pages/AddAssetPage';


function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Navbar with Link components */}
        <Navbar />
        <MainContent />
      </div>
    </Router>
  );
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/") {
    return null;
  }

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column position-fixed" style={{ height: '100vh', width: '250px' }}>
      <div className="container-fluid flex-column">
        <Link className="navbar-brand" to="/home">dConstruct Robotics</Link>
        <ul className="navbar-nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Branding</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Guides</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Operations</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/update">Updates</Link>
          </li>
        </ul>
      </div>


      <div style={{ marginBottom: "10px" }} >
        <button className="btn btn-dark w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>

  );
};


const MainContent: React.FC = () => {
  const location = useLocation();
  const leftMargin = location.pathname === '/' ? '0' : '250px';

  return (
    <div
      className="container-fluid"
      style={{
        padding: '20px',
        marginLeft: leftMargin, // Apply margin when navbar is visible
        transition: 'margin-left 0.3s ease', // Smooth transition for margin change
      }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/update" element={<UpdatesPage />} />
        <Route path="/addasset" element={<AddAssetPage />} />
      </Routes>
    </div>
  );
};

export default App;
