import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
      });
    } else {
      axios
        .post("https://psw-server.herokuapp.com/api/users/forgot-password", {
          email: this.state.email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "No user with that email exists in the database.") {
            this.setState({
              showError: true,
              messageFromServer: "",
            });
          } else if (res.data === "Email sent.") {
            this.setState({
              showError: false,
              messageFromServer: res.data,
            });
          }
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <form className="profile-form" onSubmit={this.handleSubmit}>
          <TextField
            id="email"
            label="Forgot password?"
            value={email}
            onChange={this.handleChange("email")}
            placeholder="Email address"
          />
          <br/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            //className={classes.button}
            // disabled={loading}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword