import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt from "jwt-decode";
import moment from "moment";

import Nav from "./components/common/Nav";
import Home from "./components/page/Home";
import Products from "./components/page/cart/ProductsPage";
import Product from "./components/page/cart/ProductPage";
import Checkout from "./components/page/cart/Checkout";
import SearchResult from "./components/page/cart/SearchResult";
import Book from "./components/page/service/BookPage";
import GP from "./components/page/service/GpPage";
import Physio from "./components/page/service/PhysioPage";
// import LoginSignup from './components/LoginSignup'; // or a modal
import PrivateRoute from "./components/common/PrivateRoute";

// When App loads the first time/refreshed
export const isLoggedIn = () => {
  const token = window.localStorage.getItem("token");
  console.log("token", token);

  if (token) {
    const decoded = jwt(token);
    const expires = moment.unix(decoded.exp);

    //true if token exists & expiry < current time
    return moment().isBefore(expires);
  } else {
    return false;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  return (
    <Router>
      <div className="App">
        <Nav setLoggedIn={isLoggedIn} isLoggedIn={loggedIn} />

        <Switch>
          {/* replace with modal */}
          {/* <Route path="/login">
            <p>This is login</p>
          </Route> */}

          <Route path="/search/results">
            <SearchResult />
          </Route>

          <Route path="/products">
            <Products />
          </Route>

          <Route path="/product/:id">
            <Product />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <PrivateRoute path="/booking" setLoginStatus={setLoggedIn}>
            <Book />
          </PrivateRoute>

          <Route path="/general-practitioners">
            <GP />
          </Route>

          <Route path="/physio">
            <Physio />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
