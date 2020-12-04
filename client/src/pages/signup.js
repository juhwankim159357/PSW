import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import withStyle from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
const styles = (theme) => ({
  ...theme.formTheme,
  formControl: {
    minWidth: 120,
  },
  selectUser: {
    justifyContent: "flex-end",
  },
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      contactInfo: {},
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
  };

  //jUHWAN

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          <Typography variant="h2">Sign Up</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={8}>
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
              </Grid>

              <Grid item sm={4}>
                <TextField
                  id="userName"
                  name="userName"
                  type="text"
                  minHeight="1.1875em"
                  label="User Name"
                  fullWidth
                  className={classes.textField}
                  value={this.state.contactInfo.userName}
                  //    helperText={errors.password}
                  //    error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6}>
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
              </Grid>

              <Grid item sm={6}>
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
              </Grid>
            </Grid>

            <FormControl className={classes.formControl}>
              <InputLabel id="userrole-select">User Role</InputLabel>
              <Select
                id="userRole"
                name="userRole"
                label="User Role"
                value={this.state.userRole}
                //    helperText={errors.password}
                //    error={errors.password ? true : false}

                onChange={this.handleChange}
              >
                <MenuItem value={"Employer"}>Employer</MenuItem>
                <MenuItem value={"Candidate"}>Candidate</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="First Name"
                  fullWidth
                  className={classes.textField}
                  value={this.state.contactInfo.firstName}
                  //    helperText={errors.password}
                  //    error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Last Name"
                  fullWidth
                  className={classes.textField}
                  value={this.state.contactInfo.lastName}
                  //    helperText={errors.password}
                  //    error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={4}>
                <TextField
                  id="city"
                  name="city"
                  type="text"
                  label="City"
                  fullWidth
                  className={classes.textField}
                  value={this.state.contactInfo.city}
                  //    helperText={errors.password}
                  //    error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item sm={4}>
                <TextField
                  id="province"
                  name="province"
                  type="text"
                  label="Province"
                  fullWidth
                  className={classes.textField}
                  value={this.state.contactInfo.province}
                  //    helperText={errors.password}
                  //    error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item sm={4}>
                <TextField
                  id="country"
                  name="country"
                  type="text"
                  label="Country"
                  fullWidth
                  className={classes.textField}
                  value={this.state.contactInfo.country}
                  //    helperText={errors.password}
                  //    error={errors.password ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

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
        <Grid item sm={2}></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(signup));
