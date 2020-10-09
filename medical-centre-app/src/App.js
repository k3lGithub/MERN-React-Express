import React, { useState, useEffect } from "react";
import { getDoctors, getProducts } from "./api";

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
import MyBooking from "./components/page/service/MyBooking";
import GP from "./components/page/service/GpPage";
import Physio from "./components/page/service/PhysioPage";
// import LoginSignup from './components/LoginSignup'; // or a modal
import PrivateRoute from "./components/common/PrivateRoute";

export const isLoggedIn = () => {
  const token = window.localStorage.getItem("token");
  // console.log("token", token);

  if (token) {
    const decoded = jwt(token);
    const expires = moment.unix(decoded.exp);
    return moment().isBefore(expires);
  } else {
    return false;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  let [doctors, setDoctors] = useState([]);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    refreshDoctors();
    refreshProducts();
  }, []);

  const refreshDoctors = async () => {
    const data = await getDoctors();
    console.log(data.data[0]);
    setDoctors(data.data);
  };

  const refreshProducts = async () => {
    const data = await getProducts();
    console.log(data.data[0]);
    setProducts(data.data);
  };

  return (
    <Router>
      <div className="App">
        <Nav setLoggedIn={isLoggedIn} isLoggedIn={loggedIn} products={products} />

        <Switch>
          {/* replace with modal */}
          {/* <Route path="/login">
            <p>This is login</p>
          </Route> */}

          <Route path="/search/results">
            <SearchResult />
          </Route>

          <Route path="/products">
            <Products products={products}/>
          </Route>

          <Route path="/product/:id">
            <Product/>
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <PrivateRoute
            path="/mybooking"
            setLoginStatus={setLoggedIn}
            loggedIn={loggedIn}
          >
            <MyBooking />
          </PrivateRoute>

          <PrivateRoute path="/booking" setLoginStatus={setLoggedIn}>
            <Book doctors={doctors} />
          </PrivateRoute>

          <Route path="/general-practitioners">
            <GP doctors={doctors} />
          </Route>

          <Route path="/physio">
            <Physio doctors={doctors} />
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
