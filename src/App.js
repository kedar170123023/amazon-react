import React from "react";
import "./App.css";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import { Route, BrowserRouter, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const userSignin = useSelector(state=>state.userSignin); 
  const {loading, userInfo, error} = userSignin;

  return (
    <BrowserRouter>
      <div className="grid-container">
        {/* <!-- HEDAER --> */}
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="#">KlickKart</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>{"   "}
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> : 
              <Link to="/signin">Signin</Link>
            }
          </div>
        </header>
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>Shopping Cart</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="#">Pants</Link>
            </li>
            <li>
              <Link to="#">Shirts</Link>
            </li>
          </ul>
        </aside>

        {/* <!-- MAIN --> */}
        <main className="main">
          <div className="content">
            <Route exact={true} path="/products" component={ProductsScreen} />
            <Route exact={true} path="/products/:id" component={ProductScreen} />
            <Route exact={true} path="/" component={HomeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen}/>
          </div>
        </main>
        {/* <!-- FOOTER --> */}
        <footer className="footer">All Rights Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
