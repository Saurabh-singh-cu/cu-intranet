


import React, { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import FileManager from "./pages/FileManager";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import AcademicAffairsForm from "./components/form/AcademicAffairsForm";
import NavBar from "./pages/NavBar";
import Login from "./pages/Login";
import EntityTable from "./components/form/EntityTable";
import ClubList from "./pages/ClubList";
import SpecificCard from "./pages/SpecificCard";


function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    console.log("Login success")
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  useEffect(() => {
    // Save `isLoggedIn` state to local storage whenever it changes
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div style={{ display: "flex" }}>
        {isLoggedIn ? <SideBar /> : null}
        {console.log(isLoggedIn, "LOOOOOOO")}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/users" element={isLoggedIn ? <Users /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/EntityCreationForm" element={isLoggedIn ? <AcademicAffairsForm /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/entityTable" element={isLoggedIn ? <EntityTable /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/file-manager" element={isLoggedIn ? <FileManager /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/order" element={isLoggedIn ? <Order /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/saved" element={isLoggedIn ? <Saved /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/settings" element={isLoggedIn ? <Setting /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="/clubs" element={<ClubList />} />
            <Route path="/club" element={<SpecificCard />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/af" element={isLoggedIn ? <AcademicAffairsForm /> : <Dashboard onShowLogin={handleShowLogin} />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </div>
      </div>
      {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;