export default {
  palette: {
    primary: {
      main: "#00B2CA",
      light: "#7DCFB6",
      dark: "#1D4E89",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff0008",
      light: "#FBD1A2",
      dark: "#F79256",
      contrastText: "#fff",
    },
  },

  formTheme: {
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: "10px",
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    icon: {
      height: "50px",
      width: "50px",
    },
  },
  profileTheme: {
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
        },
      },
      "& .details-wrapper": {
        //display:"inline-block"
      },
      "& .profile-image": {
        width: 100,
        height: 100,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
  vibeTheme: {
    card: {
      position: "relative",
      display: "flex",
      marginBottom: 20,
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
      objectFit: "cover",
    },
  },
  vibeDialogTheme: {
    invisibleDivider: {
      border: "none",
      margin: 4,
    },
    profileImage: {
      maxWidth: 200,
      maxHeight: 200,
      borderRadius: "50%",
      objectFit: "cover",
    },
    dialogContent: {
      padding: 20,
    },
    expandButton: {
      position: "absolute",
      left: "90%",
    },
    spinnerDiv: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50,
    },
  },
  postVibe: {
    submitButton: {
      left: "84%",
      position: "relative",
    },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      position: "absolute",
      left: "90%",
      top: "4%",
    },
    styledHeader: {
      "padding-bottom": "0",
    },
  },
  skeletonTheme: {
    card: {
      display: "flex",
      marginBottom: 20,
    },
    cardContent: {
      width: "100%",
      flexDirection: "column",
      padding: 25,
    },
    cover: {
      minWidth: 200,
      objectFit: "cover",
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: "#00B2CA",
      marginBottom: 7,
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: "rgba(0,0,0, 0.3)",
      marginBottom: 10,
    },
    fullLine: {
      height: 15,
      width: "90%",
      backgroundColor: "rgba(0,0,0, 0.5)",
      marginBottom: 10,
    },
    halfLine: {
      height: 15,
      width: "50%",
      backgroundColor: "rgba(0,0,0, 0.5)",
      marginBottom: 10,
    },
  },
};
