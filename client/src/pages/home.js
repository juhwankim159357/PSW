import React, { Component } from "react";
import axios from 'axios';
import clsx from "clsx";

//MUI Styles
import withStyles from "@material-ui/styles/withStyles";
import Grid from "@material-ui/core/Grid";

//axios.defaults.baseURL = "http://localhost:3001/api/"
axios.defaults.baseURL = "https://psw-server.herokuapp.com/api/";

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
        <p style={{ fontSize: 36, color: "#4a54f1", textAlign: "top", paddingTop: "10px" }}>A PSW Hiring Platform</p>
        <div>
      <img src="https://blog.academyoflearning.com/wp-content/uploads/2017/05/personal-support-worker-careers-1.png" alt="personal care worker"/>
    </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(home);
