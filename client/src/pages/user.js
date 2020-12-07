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

import Job from "../components/Jobs/Job";
import { Typography } from "@material-ui/core";

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
    const { UI, user, classes } = this.props;

    const jobsList = user.credentials.applications;

    let jobsAppliedTo =
      jobsList.length !== 0 && jobsList ? (
        jobsList.map((job) => <Job key={job.id} job={job} />)
      ) : (
        <h3>No jobs applied to</h3>
      );

    return (
      <Grid
        container
        spacing={2}
        className={clsx([classes.content], {
          [classes.contentShift]: UI.drawerOpen,
        })}
      >
        <Profile />
        <Grid container spacing={2} className={classes.userWrapper}>
          <Grid item md={8}>
            {jobsAppliedTo}
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
