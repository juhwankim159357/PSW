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
    const { jobs, loading } = this.props.data;
    const { classes } = this.props;


    const jobList = this.props.data.jobs;
    return (
      <>
      { jobList.map(item => 
        <Card className={classes.card} key = {item._id}>
          <Link to={`jobs/details/${item._id}`}>
            <CardContent className={classes.content}>
              <Typography variant="h5" component={Link}>
                {item.positionTitle}
              </Typography>
              <Typography variant="body1" color="textPrimary">
               {item.description}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      )}
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
