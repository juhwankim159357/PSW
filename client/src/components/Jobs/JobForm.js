import React, { Component } from "react";
import axios from "axios";

// MUI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyle from "@material-ui/core/styles/withStyles";

import { connect } from 'react-redux';
import { postNewJob } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.formTheme,
});

export class JobForm extends Component {
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

    let token = localStorage.getItem("x-auth-token");
    
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    this.props.postNewJob(newJobPosting, config, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
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
            onChange={this.handleChange}
          />
          <TextField
            id="companyName"
            name="companyName"
            type="companyName"
            label="Company Name"
            fullWidth
            className={classes.textField}
            value={this.state.companyName}
            onChange={this.handleChange}
          />
          <TextField
            id="contractType"
            name="contractType"
            type="contractType"
            label="Contract Type"
            fullWidth
            className={classes.textField}
            value={this.state.contractType}
            onChange={this.handleChange}
          />
          <TextField
            id="description"
            name="description"
            type="description"
            label="Job Description"
            fullWidth
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  postNewJob,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyle(styles)(JobForm));
