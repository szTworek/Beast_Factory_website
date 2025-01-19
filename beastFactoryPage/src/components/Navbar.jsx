import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import {useMediaQuery} from "react-responsive";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMouseEnter = (menu) => {
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const handleClick= () => {
        setMenuOpen(prev => !prev);
    }

    const handleClickCategories = (prop) => {
        setActiveDropdown(prop);
    }

    return (
        <>
            { !isMobile && (

                <div className="navBar" >
                    <div className="Logo">
                        <NavLink to="/"><img src="../../images/BeastFactoryLogo3.png" alt="Logo" className="logo"/></NavLink>
                    </div>

                    <div className="pages">
                        <div
                            className="dropdown"
                            onMouseEnter={() => handleMouseEnter("weights")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <NavLink to="/weights">Sprzęt siłowy</NavLink>
                            {activeDropdown === "weights" && (
                                <div className="dropdownMenu">
                                    <NavLink to="/weights/1">Maszyny</NavLink>
                                    <NavLink to="/weights/2">Ławki</NavLink>
                                    <NavLink to="/weights/2">Urządzenia do ćwiczeń</NavLink>
                                </div>
                            )}
                        </div>
                        <div
                            className="dropdown"
                            onMouseEnter={() => handleMouseEnter("machines")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <NavLink to="/machines">Wolne ciężary</NavLink>
                            {activeDropdown === "machines" && (
                                <div className="dropdownMenu">
                                    <NavLink to="/machines/1">Wolne ciężary 1</NavLink>
                                    <NavLink to="/machines/2">Wolne ciężary 2</NavLink>
                                </div>
                            )}
                        </div>
                        <div
                            className="dropdown"
                            onMouseEnter={() => handleMouseEnter("bundles")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <NavLink to="/bundles">Stojaki</NavLink>
                            {activeDropdown === "bundles" && (
                                <div className="dropdownMenu" onMouseLeave={handleMouseLeave}>
                                    <NavLink to="/bundles/1">Stojaki 1</NavLink>
                                    <NavLink to="/bundles/2">Stojaki 2</NavLink>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="user">
                        <NavLink to="/Search"><img src="../../images/search_10486682.png" alt="search" className="icon"/></NavLink>

                        <NavLink to="/Account"><img src="../../images/user_10486702.png" alt="profile"
                                                            className="icon"/></NavLink>
                        <NavLink to="/Basket"><img src="../../images/cart_10486696.png" alt="basket"
                                                           className="icon"/></NavLink>
                    </div>
                </div>

            )}
            {
                isMobile && (
                    <>

                        <div className="navBar">
                                <img src="../../images/BeastFactoryLogo3.png" alt="Logo" className="logo"/>
                                <NavLink to="/Search"><img src="../../images/search_10486682.png" alt="search" className="icon"/></NavLink>
                                <NavLink to="/Account"><img src="../../images/user_10486702.png" alt="profile"
                                                            className="icon"/></NavLink>
                                <NavLink to="/Basket"><img src="../../images/cart_10486696.png" alt="basket"
                                                           className="icon"/></NavLink>
                                <a onClick={handleClick}><img src="../../images/menu_10486657.png" alt="search"
                                                              className="icon"/></a>
                                {menuOpen && (
                                    <div className="dropdownMenu">
                                        <div onClick={() => handleClickCategories("weights")} className="category">Sprzęt siłowy</div>
                                        {activeDropdown === "weights" && (
                                            <div className="subcategory">
                                                <NavLink to="/weights/1">Maszyny</NavLink>
                                                <NavLink to="/weights/2">Ławki</NavLink>
                                                <NavLink to={`/weights/3`}>Urządzenia do ćwiczeń</NavLink>
                                            </div>
                                        )}
                                        <div onClick={() => handleClickCategories("machines")} className="category">Wolne ciężary</div>
                                        {activeDropdown === "machines" && (
                                            <div className="subcategory">
                                                <NavLink to="/machines/1">Hantle</NavLink>
                                                <NavLink to="/machines/2">Obciążenia</NavLink>
                                                <NavLink to={'/machines/3'}>Gryfy i sztangi</NavLink>
                                                <NavLink to={'/machines/4'}>Kettlebell</NavLink>
                                            </div>
                                        )}
                                        <div onClick={() => handleClickCategories("bundles")} className="category">Stojaki</div>
                                        {
                                            activeDropdown === "bundles" && (
                                                <div className="subcategory">
                                                    <NavLink to="/bundles/1">Stojaki na hantle</NavLink>
                                                    <NavLink to="/bundles/2">Stojaki na sztangi</NavLink>
                                                </div>
                                            )
                                        }
                                    </div>
                                )}
                        </div>
                    </>
                )
            }
        </>)
};

export default Navbar;
