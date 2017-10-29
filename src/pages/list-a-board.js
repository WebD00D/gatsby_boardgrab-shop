import React, { Component } from "react";
import Link from "gatsby-link";
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
import FatherTime from "../utils/fatherTime";
import FileUploader from "react-firebase-file-uploader";
import { connect } from "react-redux";
import Moment from "react-moment";

import "../layouts/css/login.css";
import "../layouts/css/listing.css";
import "../layouts/css/tables.css";
import "../layouts/css/fcss.css";
import "../layouts/css/button.css";

class ListABoard extends Component {
  constructor(props) {
    super(props);

    this.handleListing = this.handleListing.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handlePostAnother = this.handlePostAnother.bind(this);

    this.state = {
      listingTitle: "1",
      brandShaper: "2",
      model: "3",
      dimensions: "4",
      fins: "5",
      condition: "6",
      dimensions: "7",
      height: "",

      shaperInfo: "8",
      price: "655",

      avatar: "",
      isUploading: false,
      photoOneProgress: 0,
      photoOneURL: "",
      boardJustPosted: false
    };
  }

  handlePostAnother() {
    this.setState({
      boardJustPosted: false
    });
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fire
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  handleListing() {
    const dateTime = Date.now();

    // Save under shop
    fire
      .database()
      .ref(
        `shops/${this.props.shop_coast}/${this.props.userId}/boards/${dateTime}`
      )
      .set({
        listDate: Date.now(),
        status: "PENDING",
        title: this.state.listingTitle,
        brand_shaper: this.state.brandShaper,
        model: this.state.model,
        dims: this.state.dimensions,
        fins: this.state.fins,
        condition: this.state.condition,
        dimensions: this.state.dimensions,
        shaperInfo: this.state.shaperInfo,
        price: this.state.price,
        photoOneURL: this.state.avatarURL
      });

    // Save under ALL BOARDS w/ Coast
    fire
      .database()
      .ref(`boards/${this.props.shop_coast}/${dateTime}`)
      .set({
        listDate: Date.now(),
        status: "PENDING",
        userId: this.props.userId,
        title: this.state.listingTitle,
        brand_shaper: this.state.brandShaper,
        model: this.state.model,
        dims: this.state.dimensions,
        fins: this.state.fins,
        condition: this.state.condition,
        dimensions: this.state.dimensions,
        shaperInfo: this.state.shaperInfo,
        price: this.state.price,
        photoOneURL: this.state.avatarURL
      });

    this.setState({
      boardJustPosted: true
    });
  }

  render() {
    if (!this.props.userId) {
      return <Redirect to="/please-sign-in" />;
    }

    if (this.state.boardJustPosted) {
      return (
        <div className="create-account">
          <div className="create-account__headline m-b-20">
            Board submitted.
          </div>
          <button
            onClick={this.handlePostAnother}
            className="button button--green button--small m-b-20"
          >
            Post another?
          </button>
          <Link to="/inventory" className="td-none t-sans fc-green f-11 m-t-30">
            Go to my quiver.
          </Link>
        </div>
      );
    }

    return (
      <div className="create-account">
        <div className="create-account__headline m-b-10">List a Board </div>
        <Link to="/inventory" className="td-none t-sans fc-green f-11 ">
          Cancel and return to list
        </Link>

        <div className="login-form__field m-t-30">
          <div className="login-form__field">
            <label>Listing Title </label>
            <input
              name="listingTitle"
              onChange={e => {
                this.setState({ listingTitle: e.target.value });
              }}
              type="text"
            />
          </div>
          <label>Brand / Shaper </label>
          <input
            name="brandShaper"
            onChange={e => {
              this.setState({ brandShaper: e.target.value });
            }}
            type="text"
          />
        </div>

        <div className="login-form__field m-t-30">
          <div className="login-form__field">
            <label>Model </label>
            <input
              name="model"
              onChange={e => {
                this.setState({ model: e.target.value });
              }}
              type="text"
            />
          </div>
          <label>Dimensions </label>
          <input
            name="dimensions"
            onChange={e => {
              this.setState({ dimensions: e.target.value });
            }}
            type="text"
          />
        </div>

        <div className="login-form__field m-t-30">
          <div className="login-form__field">
            <label>Fins </label>
            <input
              name="fins"
              onChange={e => {
                this.setState({ fins: e.target.value });
              }}
              type="text"
            />
          </div>
          <label>Condition </label>
          <input
            name="condition"
            onChange={e => {
              this.setState({ condition: e.target.value });
            }}
            type="text"
          />
        </div>

        <div className="login-form__field m-t-30">
          <div className="login-form__field">
            <label>Description </label>
            <input
              name="description"
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
              type="text"
            />
          </div>
          <label>Shaper Info </label>
          <input
            name="shaperInfo"
            onChange={e => {
              this.setState({ shaperInfo: e.target.value });
            }}
            type="text"
          />
        </div>

        <div className="login-form__field m-t-30">
          <div className="login-form__field">
            <label>Price </label>
            <input
              name="price"
              onChange={e => {
                this.setState({ price: e.target.value });
              }}
              type="text"
            />
          </div>
        </div>

        <div className="login-form__field m-t-30">
          <div className="login-form__field">
            <label htmlFor="avatar">
              Primary Photo{" "}
              {this.state.isUploading && (
                <span className="f-11 t-sans t-upper fc-green">
                  {" "}
                  {this.state.progress} %
                </span>
              )}
            </label>
            <FileUploader
              className="inputFile"
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={fire.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />

            {this.state.avatarURL && <img src={this.state.avatarURL} />}
          </div>
        </div>

        <button
          onClick={this.handleListing}
          className="button button--green button--large"
        >
          Publish Listing
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ userId, shop_coast }) => {
  return { userId, shop_coast };
};

export default connect(mapStateToProps)(ListABoard);
