import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../style/common.style.css";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

class CloudinaryUploadWidgetForWrite extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.props.uploadContentImage(result.info.secure_url);
        }
        if (error) this.props.errorController(error)
      } //https://cloudinary.com/documentation/react_image_and_video_upload
    );
    document.getElementById("upload_content_img_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <Button id="upload_content_img_widget" size="sm" className="white-btn small-btn">
        이미지 업로드
      </Button>
    );
  }
}

export default CloudinaryUploadWidgetForWrite;
