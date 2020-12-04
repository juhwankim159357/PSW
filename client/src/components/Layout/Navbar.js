import React, { Component, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// MUI Styles
import withStyles from "@material-ui/styles/withStyles";

// MUI Icons
import MenuIcon from "@material-ui/icons/Menu";

import {connect} from "react-redux";

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
});

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.isOpen,
          })}
        >
          <Toolbar>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <IconButton
                  aria-label="Open menu"
                  onClick={this.props.handleDrawerOpen}
                  edge="start"
                  className={clsx(
                    classes.menuButton,
                    this.props.isOpen && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Button color="inherit" omponent={Link} to="/">
                  <Typography noWrap>
                    Menu
                  </Typography>
                </Button>
              </Grid>

              <Grid item>
                <Button color="inherit" component={Link} to="/signup">
                  <Typography noWrap>
                    Signup
                  </Typography>
                </Button>

                <Button color="inherit" component={Link} to="/login">
                  <Typography noWrap>
                    Login
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
