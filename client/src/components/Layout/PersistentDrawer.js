//TODO Make markups based on user role
//TODO Make array of items for mapping the menu items
//TODO Choose icons for list
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Core
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

// MUI Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

//MUI Styles
//import withStyles from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

import {connect} from "react-redux";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerTitle: {
    justifyContent: "flex-start",
  },
});

class PersistentDrawer extends Component {
  render() {
    const { user, classes } = this.props;
    let drawerHeaderText;
    var listMarkup;

    const unauthenticatedList = [
      {
        text: "Home",
        linkTo: "/",
      },
      {
        text: "Login",
        linkTo: "/login",
      },
      {
        text: "Signup",
        linkTo: "/signup",
      },
    ];

    const candidateList = [
      {
        text: "Home",
        linkTo: "/",
      },
      {
        text: "Profile",
        linkTo: "/user",
        divider: true,
      },
      {
        text: "Job Postings",
        linkTo: "/jobs",
      },
      {
        text: "Questions",
        linkTo: "/Questions",
      },
    ];

    const employerList = [
      {
        text: "Home",
        linkTo: "/",
      },
      {
        text: "Job Postings",
        linkTo: "/jobs",
      },
      {
        text: "Post Job",
        linkTo: "jobs/addJob",
      },
    ];

    // Conditional List Markup
    if (!user.authenticated) {
      drawerHeaderText = "";
      listMarkup = (
        <List>
          {unauthenticatedList.map((item, index) => {
            const { text, linkTo, divider } = item;
            return (
              <Link to={linkTo} underline="none" color="textPrimary" key={index}>
                <ListItem button divider={divider ? divider : false}>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      );
    } else if (user.authenticated && user.credentials.userRole === "Candidate") {
      drawerHeaderText = "Candidate";
      listMarkup = (
        <List>
          {candidateList.map((item, index) => {
            const { text, linkTo, divider } = item;
            return (
              <Link to={linkTo} underline="none" color="textPrimary" key={index}>
                <ListItem button divider={divider ? divider : false}>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      );
    } else if(user.authenticated && user.credentials.userRole === "Employer") {
      drawerHeaderText = "Employer";
      listMarkup = (
        <List>
          {employerList.map((item, index) => {
            const { text, linkTo } = item;
            return (
              <Link to={linkTo} underline="none" color="textPrimary" key={index}>
                <ListItem button>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      );
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.isOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <h2>{drawerHeaderText}</h2>
            <Grid container spacing={2} justify="space-between" />
            <IconButton onClick={this.props.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {listMarkup}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

PersistentDrawer.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(PersistentDrawer)));
