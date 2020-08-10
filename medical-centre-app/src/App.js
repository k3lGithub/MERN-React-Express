import React, { useEffect, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import Button from '@material-ui/core/Button';
import { LoginPage, fakeAuth } from "./components/LoginSignup";

import Nav from "./components/common/Nav";
import Header from "./components/common/Header";
import Home from "./components/page/Home";
import Products from "./components/page/cart/ProductsPage";
import Product from "./components/page/cart/ProductPage";
import Checkout from "./components/page/cart/Checkout";
import SearchResult from "./components/page/cart/SearchResult";
import Book from "./components/page/service/BookPage";
import GP from "./components/page/service/GpPage";
import Physio from "./components/page/service/PhysioPage";
import LoginSignup from './components/LoginSignup'; // or a modal



// When App loads the first time/refreshed
const isLoggedIn = () => {
  if (window.localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

function App() {

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  return (
    <Router>
    <div className="App">
      <Header/>
      <Nav/>
      {/* <header className="App-header">
      </header> */}

      <Switch>

          <Route path="/login">
            <LoginSignup setLoginStatus={setLoggedIn} />
          </Route>

          <Route path="/search/results">
            <SearchResult/>
          </Route>

          <Route path="/products">
            <Products/>
          </Route>

          <Route path="/product/:id">
            <Product/>
          </Route>

          <Route path="/checkout">
            <Checkout/>
          </Route>

          <Route path="/booking">
            <Book/>
          </Route>

          <Route path="/general-practitioners">
            <GP/>
          </Route>

          <Route path="/physio">
            <Physio/>
          </Route>

          <Route path="/">
            <Home/>
          </Route>

      </Switch>

      <Button variant="contained" color="primary">
      Hello
    </Button>
    </div>
    </Router>

  );
}

export default App;
