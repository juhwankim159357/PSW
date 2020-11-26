import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyle from "@material-ui/core/styles/withStyles";

import {connect} from "react-redux";
import {signupUser} from "../redux/actions/userActions";
const styles = (theme) => ({
  ...theme.formTheme,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      userRole: "",
      loading: false,
      errors: {},
    };
  }

  //Juhwan
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    //Make new object for database
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userRole: this.state.userRole,
    };

    this.props.signupUser(newUserData, this.props.history);
    //axios.get("/users/test");
    
    // Post to database
    // Host backend on Heroku, change localhost link to Heroku link
    // axios.post("/users/signup", newUserData)
    // .then ( () => {this.props.history.push("/user");})
    // .catch( (err) => { this.props.history.push("/");});
    // console.log(newUserData);
  };

  //jUHWAN

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <Grid container>
        <Grid item sm></Grid>
        <Grid item sm>
          <Typography variant="h2">Sign Up</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              className={classes.textField}
              value={this.state.email}
              //   helperText={errors.email}
              //   error={errors.email ? true : false}

              onChange={this.handleChange}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              className={classes.textField}
              value={this.state.password}
              //    helperText={errors.password}
              //    error={errors.password ? true : false}

              onChange={this.handleChange}
            />

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              fullWidth
              className={classes.textField}
              value={this.state.confirmPassword}
              //   helperText={errors.confirmPassword}
              //   error={errors.confirnPassword ? true : false}

              onChange={this.handleChange}
            />

            <TextField
              id="userRole"
              name="userRole"
              type="text"
              label="User Role"
              fullWidth
              className={classes.textField}
              value={this.state.userRole}
              //    helperText={errors.password}
              //    error={errors.password ? true : false}

              onChange={this.handleChange}
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign Up
            </Button>
            <br></br>
            <small>
              Already have an account? Login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = {
  signupUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyle(styles)(signup));

