import React from "react";
import "./App.css";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import { Route, BrowserRouter, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

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
            <Link to="#">Cart</Link>
            <Link to="#">Sign In</Link>
          </div>
        </header>

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
            <Route path="/products/:id" component={ProductScreen} />
            <Route exact={true} path="/" component={HomeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </div>
        </main>
        {/* <!-- FOOTER --> */}
        <footer className="footer">All Rights Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
