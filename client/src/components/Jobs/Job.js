import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import theme from "../../util/theme";

// Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";
import { getJob } from "../../redux/actions/dataActions";

const styles = {
  ...theme.vibeTheme,
};

export class Job extends Component {

  handleClick = (event) => {
    this.props.getJob(this.props.job._id);
  };

  render() {
    const {
      classes,
      job: { positionTitle, description },
    } = this.props;

    return (
      <Card className={classes.card} onClick={this.handleClick}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`jobs/${this.props.job._id}`}>
            {positionTitle}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Job.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
    getJob
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Job));
