import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { uploadResume } from "../../redux/actions/userActions";

class FileUpload extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedFile: null,
    };
  }

  handleChange = (event) => {
    console.log("EVENT TARGET   ---", event.target);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    }, () => console.log("SELECTED FILE   ---", this.state.selectedFile));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let token = window.localStorage.getItem("x-auth-token");

    const formData = new FormData();
    formData.append("MyResume", this.state.selectedFile);
    console.log("formData    ---", formData);
    const config = {
      headers: {
        "x-auth-token": token,
        "content-type": "multipart/form-data",
      },
    };

    this.props.uploadResume(formData, config);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Resume Upload</h1>
        <input
          type="file"
          name="file"
          className="custom-file-input"
          onChange={this.handleChange}
        />
        {/* {console.log(this.state.file)} */}
        <button className="upload-button" type="submit">
          Upload
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadResume,
};

export default connect(mapStateToProps, mapActionsToProps)(FileUpload);
