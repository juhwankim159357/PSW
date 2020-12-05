import React, { Component } from "react";
import clsx from "clsx";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";

import Profile from "../components/Profile/Profile";
import UploadSidebar from "../components/Profile/UploadSidebar";
import FileUpload from "../components/Profile/FileUpload";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

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
  constructor() {
    super();
    this.state = {
      profile: null,
      userIDParam: null,
    };
  }

  render() {
    const { UI, classes } = this.props;
    return (
      <Grid container
        spacing={2}
        className={clsx([classes.content], {
          [classes.contentShift]: UI.drawerOpen,
        })}
      >
        <Profile />
        <Grid container spacing={2} className={classes.userWrapper}>
          <Grid item md={8}>
            Review Resume
          </Grid>
          <Grid item>
            <FileUpload />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(user));
