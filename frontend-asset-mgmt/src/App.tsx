import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

import brandingImage from './Branding.png';
import productImage from './Products.png';
import eventsImage from './Events.png';
import guidesImage from './Guides.png';
import operationsImage from './Operations.png';

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import UpdatesPage from './Pages/UpdatesPage';
import AddAssetPage from './Pages/AddAssetPage';
import BrandingPage from './Pages/BrandingPage';
import ProductPage from './Pages/ProductPage';
import EventsPage from './Pages/EventsPage';
import OperationsPage from './Pages/OperationsPage';

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
    <nav
      className="navbar navbar-expand-lg navbar-light flex-column position-fixed"
      style={{
        height: "100vh",
        width: "250px",
        backgroundColor: "#333333",
        justifyContent: "space-between", // Ensures proper spacing
      }}
    >
      <div className="container-fluid flex-column align-items-start">
        <Link className="navbar-brand" to="/home" style={{ color: "white", marginBottom: "20px" }}>
          dConstruct Robotics
        </Link>
        <ul className="navbar-nav flex-column w-100">
          <li className="nav-item d-flex align-items-center">
            <img
              src={brandingImage}
              alt="Branding"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <Link className="nav-link" to="/branding" style={{ color: "white" }}>
              Branding
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <img
              src={productImage}
              alt="Products"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <Link className="nav-link" to="/product" style={{ color: "white" }}>
              Products
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <img
              src={eventsImage}
              alt="Events"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <Link className="nav-link" to="/events" style={{ color: "white" }}>
              Events
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <img
              src={guidesImage}
              alt="Guides"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <Link className="nav-link" to="/home" style={{ color: "white" }}>
              Guides
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <img
              src={operationsImage}
              alt="Operations"
              style={{ width: "24px", height: "24px", marginRight: "10px" }}
            />
            <Link className="nav-link" to="/operations" style={{ color: "white" }}>
              Operations
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-100" style={{ padding: "10px" }}>
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
        backgroundColor: "#d3d3d3",
        marginLeft: leftMargin, // Apply margin when navbar is visible
        transition: 'margin-left 0.3s ease',
        overflowY: 'auto',
      }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/update" element={<UpdatesPage />} />
        <Route path="/addasset" element={<AddAssetPage />} />

        <Route path="/branding" element={<BrandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/operations" element={<OperationsPage />} />
      </Routes>
    </div>
  );
};

export default App;
