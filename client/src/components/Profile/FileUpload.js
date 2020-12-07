import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {uploadResume} from "../../redux/actions/userActions";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let token = window.localStorage.getItem('x-auth-token');
    const formData = new FormData();
    formData.append("MyResume", this.state.file);
    console.log("formData    ---", formData);
    const config = {
      headers: {
        "x-auth-token": token,
        "content-type": "multipart/form-data",
      },
    };
    
    this.props.uploadResume(formData, config);
  };

  handleChange = (event) => {
    this.setState({
      file: event.target.file,
    });
    console.log("fileupload state    ---", this.state);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Resume Upload</h1>
        <input
          type="file"
          className="custom-file-input"
          name="MyResume"
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
})

const mapActionsToProps = {
  uploadResume
}

export default connect(mapStateToProps,mapActionsToProps)(FileUpload);
