import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
        <div className="navBar" >
          <div className="Logo">
            <NavLink to="/">Logo</NavLink>
          </div>

          <div className="pages">
            <div
              className="dropdown"
              onMouseEnter={() => handleMouseEnter("weights")}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink to="/weights">Ciężary</NavLink>
              {activeDropdown === "weights" && (
                <div className="dropdownMenu">
                  <NavLink to="/weights/1">ciezary 1</NavLink>
                  <NavLink to="/weights/2">ciezary 2</NavLink>
                </div>
              )}
            </div>
            <div
              className="dropdown"
              onMouseEnter={() => handleMouseEnter("machines")}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink to="/machines">Maszyny</NavLink>
              {activeDropdown === "machines" && (
                <div className="dropdownMenu">
                  <NavLink to="/machines/1">maszyny 1</NavLink>
                  <NavLink to="/machines/2">maszyny 2</NavLink>
                </div>
              )}
            </div>
            <div
              className="dropdown"
              onMouseEnter={() => handleMouseEnter("bundles")}
              
            >
              <NavLink to="/bundles">Zestawy</NavLink>
              {activeDropdown === "bundles" && (
                <div className="dropdownMenu" onMouseLeave={handleMouseLeave}>
                  <NavLink to="/bundles/1">Zestawy 1</NavLink>
                  <NavLink to="/bundles/2">Zestawy 2</NavLink>
                </div>
              )}
            </div>
          </div>


          <div className="user">
            <NavLink to="/Search">Szukaj</NavLink>
            <NavLink to="/Account">Konto</NavLink>
            <NavLink to="/Basket">Koszyk</NavLink>
          </div>
        </div>
  );
};

export default Navbar;
