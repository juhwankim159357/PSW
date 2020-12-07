import React, { Component } from "react";

// MUI
import Grid from "@material-ui/core/Grid";

// import axios from "axios";
// import { Typography } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyle from "@material-ui/core/styles/withStyles";

import JobForm from "../../components/Jobs/JobForm";

const styles = (theme) => ({
  ...theme.formTheme,
});

export class addJob extends Component {
  constructor() {
    super();
    if (!localStorage.getItem("x-auth-token")) window.location = "/login";
  }
  render() {
    return (
      <Grid container>
        <Grid item sm={2} />
        <Grid item sm={10} />
        <JobForm history={this.props.history} />
        <Grid item sm />
        <Grid item sm={2} />
      </Grid>
    );
  }
}

export default withStyle(styles)(addJob);
