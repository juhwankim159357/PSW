import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

import theme from "../../util/theme";

import {connect} from "react-redux";
import {getAllJobs} from "../../redux/actions/dataActions";

import Job from "../../components/Jobs/Job";

const styles = {
  ...theme.vibeTheme,
};

class jobs extends Component {
  componentDidMount() {
    this.props.getAllJobs();
  }


  constructor() {
    super();
    if (!localStorage.getItem("x-auth-token")) window.location = "/login";
  }
  render() {
    const { jobs, loading } = this.props.data;
    const { classes } = this.props;

    let jobMarkup = jobs.map((job) => <Job key={job._id} job={job} />);

    return (
      <>
        {jobMarkup}
      </> 
    
    );
  }
}

jobs.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {getAllJobs})(withStyle(styles)(jobs));
