import React, { Component } from "react";
import axios from 'axios';
import clsx from "clsx";

//MUI Styles
import withStyles from "@material-ui/styles/withStyles";
import Grid from "@material-ui/core/Grid";

axios.defaults.baseURL = "https://dashboard.heroku.com/apps/psw-server/api";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 100,
  },
});

// TODO The content class messes up the responsiveness and I don't know why
// For the above, this grid item below does not restrict itself to the content portion of the div container in app.js

class home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={clsx([classes.content], {
        [classes.contentShift]: this.props.isOpen,
      })}>
        <Grid item >
          Hello World Hello World Hello World
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(home);
