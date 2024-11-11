import React, { useState } from 'react';
import { FaBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const redirectLogin = () => {
      navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
       
        <div className="logo">
          <span className="logo-cu">CU</span>
          <span className="logo-ims">INTRANET</span>
        </div>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search & Bookmark your page"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
   
      </div>
      
      <div className="navbar-right">
        <button className="icon-button">
          <span> <FaBell /></span>
        </button>
        <button className="icon-button">
         <span><MdMessage /></span>
        </button>
        <div className="user-profile">
          <span style={{cursor:"pointer"}} onClick={redirectLogin} className="user-name">Login</span>
         
        </div>
      
        <button className="icon-button">
         <span><IoSettings /></span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;