import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import imageUrl from "../../images/glonn.jpg";

// Redux
import { connect } from "react-redux";

import ScoreCircle from "./ScoreCircle";

const styles = (theme) => ({
  ...theme.profileTheme,
  root: {
    flexGrow: 1,
  },
  profile: {
    ...theme.profileTheme.profile,
    "& .profile-details": {
      textAlign: "left",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
  },
});

class Profile extends Component {
  render() {
    const { user, classes } = this.props;
    return (
      <Grid
        container
        item
        spacing={2}
        xs={12}
        className={classes.profileWrapper}
        alignItems="center"
      >
        <Grid item>
          <Avatar
            src={imageUrl}
            alt={user.credentials.userName}
            className={classes.profileImg}
          />
        </Grid>

        <Grid item flex-direction="column" className={classes.profileShort}>
          <Grid item>
            <Typography variant="h4">{user.credentials.userName}</Typography>
          </Grid>

          <Grid item>
            <LocationOn />
            <Typography display="inline">Toronto, Ontario</Typography>
          </Grid>
        </Grid>

        <Grid item className="score">
          <ScoreCircle value="86" />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
