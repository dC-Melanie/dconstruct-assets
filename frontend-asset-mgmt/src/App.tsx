import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
        <Navbar />
        <MainContent />
      </div>
    </Router>
  );
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (location.pathname === "/") {
    return null;
  }

  const handleLogout = () => {
    navigate("/");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light flex-column position-fixed"
      style={{
        height: "100vh",
        width: isCollapsed ? "80px" : "250px",
        backgroundColor: "#333333",
        justifyContent: "space-between",
        transition: "width 0.3s ease",
      }}
    >
      <div className="container-fluid flex-column align-items-start">
        <button
          className="btn btn-sm btn-dark mb-3"
          onClick={toggleCollapse}
          style={{ alignSelf: "flex-end" }}
        >
          {isCollapsed ? "→" : "←"}
        </button>
        <Link
          className="navbar-brand"
          to="/home"
          style={{
            color: "white",
            marginBottom: "20px",
            display: isCollapsed ? "none" : "block",
          }}
        >
          dConstruct Robotics
        </Link>
        <ul
          className="navbar-nav flex-column w-100"
          style={{
            gap: "20px", // Consistent spacing between items
            paddingLeft: "10px",
          }}
        >
          {[
            { to: "/branding", icon: brandingImage, label: "Branding" },
            { to: "/product", icon: productImage, label: "Products" },
            { to: "/events", icon: eventsImage, label: "Events" },
            { to: "/home", icon: guidesImage, label: "Guides" },
            { to: "/operations", icon: operationsImage, label: "Operations" },
          ].map((item, index) => (
            <li
              key={index}
              className="nav-item d-flex align-items-center"
              style={{
                alignItems: "center",
                padding: "10px 0", // Equal spacing regardless of collapse
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: isCollapsed ? "0" : "10px",
                }}
              />
              {!isCollapsed && (
                <Link className="nav-link" to={item.to} style={{ color: "white" }}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-100" style={{ padding: "10px" }}>
        {!isCollapsed && (
          <button className="btn btn-dark w-100" onClick={handleLogout}>
            Logout
          </button>
        )}
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
        minHeight: '100vh', // Ensures it spans the full viewport height
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
