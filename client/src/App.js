import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

//MUI Stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Components
import Navbar from "./components/Layout/Navbar";
import PersistentDrawer from "./components/Layout/PersistentDrawer";

import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import User from "./pages/user";
import jobs from "./pages/jobs";
import addjob from "./pages/addJob";

const theme = createMuiTheme(themeFile);


const token = localStorage.XAuthToken;
if (token) {
  const decodedToken = jwtDecode(token); //Gives token a field exp?
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/users/login";
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


// Three user roles, unauthenticated, candidate, employer
class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isLoaded: false,
      userData: {
        token: "",
        user: {},
      },
      authenticated: false,
    };
  }

  setUserData = () => {

  };

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar
              isOpen={this.state.isOpen}
              userRole={this.state.userRole}
              handleDrawerOpen={this.handleDrawerOpen.bind(this)}
            />
            <div className="container">
              <PersistentDrawer
                isOpen={this.state.isOpen}
                userRole={this.state.userRole}
                handleDrawerClose={this.handleDrawerClose.bind(this)}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Home {...props} isOpen={this.state.isOpen} />
                  )}
                />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route
                  exact
                  path="/user"
                  render={(props) => (
                    <User {...props} isOpen={this.state.isOpen} />
                  )}
                />
                <Route exact path="/jobs" component={jobs} />
                <Route exact path="/jobs/addJob" component={addjob} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
