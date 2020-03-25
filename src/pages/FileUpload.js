import React, { Component } from 'react';

export default class FileUpload extends Component {
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form
          action="http://localhost:5000/upload"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="file" name="file" id="file"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}
