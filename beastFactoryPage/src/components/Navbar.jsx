import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="navBar">
        <div className="Logo">
          <NavLink to="/">Logo</NavLink>
        </div>

        <div className="pages">
          <NavLink to="/weights">Ciężary</NavLink>
          <NavLink to="/machines">Maszyny</NavLink>
          <NavLink to="/bundles">Zestawy</NavLink>
        </div>
        <div className="user">
          <NavLink to="/Search">Szukaj</NavLink>
          <NavLink to="/Account">Konto</NavLink>
          <NavLink to="/Basket">Koszyk</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
