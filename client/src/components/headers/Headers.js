import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";

function Headers() {
  const state = useContext(GlobalState);
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
  const [isLoggedIn, setIsLoggedIn] = state.userApi.isLoggedIn;
  const [cart] = state.userApi.cart;
  const[menu,setMenu]=useState(false)

  async function handleLogOutClick() {
    await axios.get("/user/logOut");
    localStorage.clear();
    window.location.href = "/login";
    setIsAdmin(false);
    setIsLoggedIn(false);
  }

  function adminRouter() {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </>
    );
  }

  function loggedRouter() {
    return (
      <>
        <li>
          <Link to="/" onClick={handleLogOutClick}>
            Logout
          </Link>
        </li>
      </>
    );
  }

  const styleMenu={
    left: menu ?0:"-100%"
  }

  const toggleMenu=()=>setMenu(!menu)
  return (
    <header>
      <div className="menu"  onClick={toggleMenu} >
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <Link to="/">{isAdmin ? "Admin" : "Budhaair And Sons"}</Link>
      </div>

      <ul style={styleMenu}>
        <li> <Link to="/">{isAdmin ? "Products" : "Shop"}</Link></li>
         {isAdmin && adminRouter()}
        {isLoggedIn ?loggedRouter(): <li><Link to="/login">Login/Register</Link> </li> }
        <li><img src={Close} className='menu' alt="" width="30" onClick={toggleMenu} /></li>
        </ul> 
       
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <Link to="/cart">
            <span>{cart.length}</span>
            <img src={Cart} alt="" width="30"  />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Headers;
