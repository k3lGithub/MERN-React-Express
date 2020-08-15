import React, { useState, setState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { login, register } from "../api";
import jwt from "jwt-decode";
import moment from "moment";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//LOGIN and REGISTER
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  //Modal
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    //Tab
    root: {
      flexGrow: 1,
    },
    //Login and Register
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  },
}));

// Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// ============================ Component ============================

export default function LoginSignup(props) {
  // Initialization
  let history = useHistory();
  let location = useLocation();

  // console.log(location)
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [postcode, setPostcode] = useState("");

  // Always ask to login for Private Routes
  useEffect(() => {
    if (!props.isLoggedIn && location.pathname === "/booking") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.isLoggedIn]);

  const redirectAndUpdate = async () => {
    // close modal here
    setOpen(false);
    // history.push("/");
    // Figure how to sync state, props and DOM ****
    // Temp workaround
    window.location.reload(false);
  };

  // Fetch Login API
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    login({
      email: email,
      password: password,
    })
      .then((data) => {
        if (data.status === 200) {
          const token = data.headers.get("token");
          const decoded = jwt(token);
          console.log("decoded", decoded);
          const expires = moment.unix(decoded.exp);
          const isBeforeExpiry = moment().isBefore(expires);

          localStorage.setItem("token", token);
          redirectAndUpdate();
        } else {
          setLoginError(data.message);
        }
      })
      .catch((e) => {
        setLoginError(e);
      });
  };

  // Fetch Register API
  const handleSubmitRegister = (e) => {
    e.preventDefault();

    register({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phone: phone,
      postcode: postcode,
    })
      .then((data) => {
        if (data.status === 200) {
          setRegisterError("");
          alert("Registration Successful! Please login.");
          redirectAndUpdate();
          // form not opening again
          // setOpen(true);
        } else {
          setRegisterError(data.message);
        }
      })
      .catch((e) => {
        setRegisterError(e.message);
      });
  };

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // Tab
  const [value, setValue] = React.useState(0);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const body = (
    <div centered style={modalStyle} className={classes.paper}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleTabChange} aria-label="tabs">
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <p class="error">{loginError}</p>

          {/* Login Form starts */}
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Typography component="h1" variant="h5"></Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmitLogin}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setUserEmail(e.currentTarget.value)}
                value={email}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => setUserPassword(e.currentTarget.value)}
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Register starts */}
          <p class="error">{registerError}</p>
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Typography component="h1" variant="h5"></Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmitRegister}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    value={firstName}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    value={lastName}
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                    value={phone}
                    label="Phone Number"
                    name="phone"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="postcode"
                    onChange={(e) => setPostcode(e.currentTarget.value)}
                    value={postcode}
                    label="Postcode"
                    name="postcode"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    onChange={(e) => setUserEmail(e.currentTarget.value)}
                    value={email}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setUserPassword(e.currentTarget.value)}
                    value={password}
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
        </TabPanel>
      </div>
    </div>
  );

  // =============================== Functionality ===============================

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Button variant="outlined" size="small" onClick={handleModalOpen}>
        Sign In / Sign Up
      </Button>
      <Modal
        id="loginModal"
        // open={open ? open : !props.isLoggedIn}
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
