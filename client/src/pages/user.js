import React, { Component } from "react";
import clsx from "clsx";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";

import Profile from "../components/Profile/Profile";
import UploadSidebar from "../components/Profile/UploadSidebar";

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
    marginLeft: 180,
  },
});

class user extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container 
        direction={"row"}
        spacing={2}
        className={clsx([classes.content], {
          [classes.contentShift]: this.props.isOpen,
        })}
      >
        <Profile />
        <Grid container spacing={2} className={classes.userWrapper}>
          <Grid item md={8}>
            Review Resume
          </Grid>
          <Grid item md={4}>
            <UploadSidebar />
          </Grid>
        </Grid>
      </Grid>

      
    );
  }
}

export default withStyles(styles)(user);
