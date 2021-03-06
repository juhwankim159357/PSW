import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/index';

import ForgotPassword from '../components/Password/ForgotPassword';

const styles = (theme) => ({
  ...theme.formTheme,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  
  static getDerivedStateFromProps(nextProps) {
    if(nextProps.UI.errors){
      return {errors: nextProps.UI.errors};
    }
    else return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }; 

  render() {
    const { classes, UI:{loading} } = this.props;
    const { errors } = this.state;

    
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
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
              disabled={loading}
            >
              Login
              {/* {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )} */}
            </Button>
            <br></br>
            <small>
              No account? Sign Up <Link to="/signup">here</Link>
            </small>
          </form>
          <ForgotPassword />
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps ={
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyle(styles)(login));
