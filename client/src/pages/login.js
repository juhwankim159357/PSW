import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // CHANGE LOCAL DATABASE LINK TO HEROKU DATABASE LINK
    axios
      .post("/api/login", userData)
      .then((res) => {
        //this.props.history.push("/user");
        //console.log(res.body);
        // localStorage.setItem("x-auth-token", res.data.token);
        // axios.defaults.headers.common["Authorization"] = res.data.token;
      })
      .catch((err) => {
        //this.props.history.push("/");
        //console.log(err.message);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
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
              //  helperText={errors.email}
              //   error={errors.email ? true : false}
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
              //  helperText={errors.password}
              //   error={errors.password ? true : false}
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
              //   disabled={loading}
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
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(login);