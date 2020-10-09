import React from "react";
import Search from "./Search";
import { useHistory } from "react-router-dom";
import logo from "../../medicalLogo.png";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LoginSignup from "../LoginSignup";


// Material-UI styles
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

// Nav Component
export default function Nav(props) {
  const classes = useStyles();
  const history = useHistory();

  // Menu handlers
  const [anchorElLogout, setAnchorElLogout] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickLogout = (event) => {
    setAnchorElLogout(event.currentTarget);
  };

  const handleCloseLogout = () => {
    setAnchorElLogout(null);
  };

  const handleLogout = () => {
    setAnchorElLogout(null);
    window.localStorage.clear();
    console.log(props.isLoggedIn);
    history.push("/");
    // Figure how to sync state, props and DOM
    // Temp workaround
    window.location.reload(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* Header  */}
        <img src={logo} className="App-logo" alt="logo" />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
          id="logoTitle"
        >
          Medical Centre
        </Typography>

        {/* <TextField id="search" label="Search" variant="outlined" /> */}
        < Search products={props.products}/>

        {/* SEARCH */}
        <IconButton>
          <SearchIcon id="searchBtn" />
        </IconButton>

        {/* CHECKOUT */}
        <Link href="/checkout">
          <IconButton>
            <ShoppingCartIcon id="cart" />
          </IconButton>
        </Link>

        {/* PROFILE */}
        <Link
          key="profile"
          variant="body2"
          href="#"
          className={classes.toolbarLink}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickLogout}
        >
          <IconButton>
            <PersonOutlineIcon id="profile" />
          </IconButton>
        </Link>
        {props.isLoggedIn ? (
          <Menu
            id="profile-menu"
            anchorEl={anchorElLogout}
            keepMounted
            open={Boolean(anchorElLogout)}
            onClose={handleCloseLogout}
          >
            {/* // open={open ? open : !props.isLoggedIn} */}
            <Link href="#">
              {" "}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>{" "}
            </Link>
            <Link href="/mybooking">
              <MenuItem>My Booking</MenuItem>
            </Link>
          </Menu>
        ) : null}

        {/* LOGIN/REGISTER */}
        {props.isLoggedIn ? null : (
          <LoginSignup
            setLoggedIn={props.setLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        )}
      </Toolbar>
      {/* Nav Bar */}
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          color="inherit"
          noWrap
          key="Products"
          variant="body2"
          href="/products"
          className={classes.toolbarLink}
        >
          Products
        </Link>
        <Link
          color="inherit"
          noWrap
          key="Services"
          variant="body2"
          href="#"
          className={classes.toolbarLink}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Services
        </Link>
        {/* Dropdown menu */}
        <Menu
          id="services-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link href="/general-practitioners">
            {" "}
            <MenuItem onClick={handleClose}>
              General Practitioners
            </MenuItem>{" "}
          </Link>
          <Link href="/physio">
            {" "}
            <MenuItem onClick={handleClose}>Physiotherapists</MenuItem>{" "}
          </Link>
        </Menu>
        <Link
          color="inherit"
          noWrap
          key="Book"
          variant="body2"
          href="/booking"
          className={classes.toolbarLink}
        >
          Book
        </Link>
        <Link
          color="inherit"
          noWrap
          key="Store Locator"
          variant="body2"
          href="#"
          className={classes.toolbarLink}
        >
          <LocationOnIcon />
          Store Locator
        </Link>
      </Toolbar>
    </React.Fragment>
  );
}
