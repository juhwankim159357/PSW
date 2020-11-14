import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

import theme from "../../util/theme";

import {connect} from "react-redux";
import {getAllJobs} from "../../redux/actions/dataActions";

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
    // const { jobs, loading } = this.props.data;
    const { classes } = this.props;

    console.log(this.props.data);

    //TODO Map job list array
    // const jobList = [
    //     {
    //         title: "PSW 1",
    //         jobDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fusce quis augue nec eros convallis sagittis. Aenean tempor quam et tortor accumsan dictum.",
    //         path: "/jobDetails",
    //     },
    //     {
    //         title: "PSW 2",
    //         jobDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fusce quis augue nec eros convallis sagittis. Aenean tempor quam et tortor accumsan dictum.",
    //     },
    //     {
    //         title: "PSW 3",
    //         jobDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fusce quis augue nec eros convallis sagittis. Aenean tempor quam et tortor accumsan dictum.",
    //     },
    //     {
    //         title: "PSW 5",
    //         jobDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fusce quis augue nec eros convallis sagittis. Aenean tempor quam et tortor accumsan dictum.",
    //     },
    // ]

    return (
        <Card className={classes.card}>
          <CardMedia title="Profile Image" className={classes.image} />
          <Link to="jobs/details">
            <CardContent className={classes.content}>
              <Typography variant="h5" component={Link}>
                Position Title
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Job Desc: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Fusce quis augue nec eros convallis sagittis. Aenean
                tempor quam et tortor accumsan dictum.
              </Typography>
            </CardContent>
          </Link>
        </Card>
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