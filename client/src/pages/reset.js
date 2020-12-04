import React, { Component } from "react";
import PropTypes from "prop-types";

// Mui
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyle from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import { resetPassword } from "../redux/actions/index";

const styles = (theme) => ({
  ...theme.formTheme,
});

class reset extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const resetData = {
      password: this.state.password,
      token: this.props.match.params.token,
    };

    this.props.resetPassword(
      resetData,
      this.props.history
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { UI, classes } = this.props;
    console.log(UI);

    return (
      <Grid container justify="center">
        <form onSubmit={this.handleSubmit}>
          <Grid item>
            <TextField
              id="password"
              name="password"
              type="password"
              label="New Password"
              fullWidth
              className={classes.textField}
              value={this.state.password}
              // helperText={errors.}
              //   error={errors.email ? true : false}
              onChange={this.handleChange}
            />
          </Grid>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign Up
            </Button>
        </form>
      </Grid>
    );
  }
}

reset.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI,
});

const mapActionsToProps = {
    resetPassword,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyle(styles)(reset));
