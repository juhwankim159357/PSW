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
  render() {
    return (
      <Grid container>
        <Grid item sm />
          <JobForm />
        <Grid item sm />
      </Grid>
    );
  }
}

export default withStyle(styles)(addJob);
