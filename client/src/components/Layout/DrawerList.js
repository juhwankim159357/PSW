// // TODO Drawer content
// import React, { Component } from "react";
// import clsx from "clsx";

// // MUI Core
// import Typography from "@material-ui/core/Typography";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";

// //MUI Styles
// import withStyles from "@material-ui/styles/withStyles";

// const drawerWidth = 240;

// const candidateList = [
//   "Apply Position",
//   "Upload Resume",
//   "Upload Application Materials",
//   "Review Resume",
//   "Review Application Status",
// ];

// const employerList = [
//   "Check Candidate",
//   "Update Candiata Status",
//   "Interview",
// ]

// const unauthenticatedList = [
//   "Login", 
//   "Signup",
// ]

// class DrawerList extends Component {
//   constructor() {
//     super();
//     this.state = {
//       userRole: "unauthenticated",
//     }
//   }
//   render() {
//     const { classes } = this.props;

//     let listMarkup = this.userRole === "unauthenticated" ? (
//       <List>
//       {unauthenticatedList.map((text, index) => (
//         <ListItem button key={text} divider>
//           <ListItemIcon>
//             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItem>
//       ))})
//     </List>
//     ) : (
//       <List>
//       {candidateList.map((text, index) => (
//         <ListItem button key={text} divider>
//           <ListItemIcon>
//             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItem>
//       ))})
//     </List>
//     )
  
//     return listMarkup;
//   }
// }

// export default withStyles(styles)(DrawerList);
