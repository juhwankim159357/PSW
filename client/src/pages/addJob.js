import React, { Component } from "react";

// MUI
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import withStyle from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.formTheme,
});

export class addJob extends Component {
  constructor() {
    super();
    this.state = {
      positionTitle: "",
      companyName: "",
      contractType: "",
      description: "",
      duties: "",
      requirements: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newJobPosting = {
      positionTitle: this.state.positionTitle,
      companyName: this.state.companyName,
      contractType: this.state.contractType,
      description: this.state.description,
      duties: this.state.duties,
      requirements: this.state.requirements,
    };

    axios
      .post("/jobs/addjob", newJobPosting)
      .then(() => {
        this.props.history.push("/job/details");
      })
      .catch((err) => {
        this.props.history.push("/");
      });
    // console.log(newJobPosting);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <Grid container>
        <Grid item sm />
        <Grid>
          <Typography variant="h2">Job Posting</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="positionTitle"
              name="positionTitle"
              type="positionTitle"
              label="Position Title"
              fullWidth
              className={classes.textField}
              value={this.state.positionTitle}
              onCHange={this.handleChange}
            />
            <TextField
              id="companyName"
              name="companyName"
              type="companyName"
              label="Company Name"
              fullWidth
              className={classes.textField}
              value={this.state.companyName}
              onCHange={this.handleChange}
            />
            <TextField
              id="contractType"
              name="contractType"
              type="contractType"
              label="Contract Type"
              fullWidth
              className={classes.textField}
              value={this.state.contractType}
              onCHange={this.handleChange}
            />
            <TextField
              id="description"
              name="description"
              type="description"
              label="Job Description"
              fullWidth
              className={classes.textField}
              value={this.state.description}
              onCHange={this.handleChange}
            />
            <TextField
              id="duties"
              name="duties"
              type="duties"
              label="Duties"
              fullWidth
              className={classes.textField}
              value={this.state.duties}
              onCHange={this.handleChange}
            />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default withStyle(styles)(addJob);
