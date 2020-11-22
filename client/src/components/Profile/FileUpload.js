import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("myfile", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:3001/upload", formData, config)
      .then((res) => {
        alert("The file is successfully uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({
      file: event.target.file,
    });
  };
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input
          type="file"
          className="custom-file-input"
          name="myImage"
          onChange={this.onChange}
        />
        {console.log(this.state.file)}
        <button className="upload-button" type="submit">
          Upload to DB
        </button>
      </form>
    );
  }
}

export default FileUpload;
