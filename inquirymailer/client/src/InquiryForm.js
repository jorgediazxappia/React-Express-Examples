import React, { Component } from "react";
import api from "./api";

class InquiryForm extends Component {
  state = {
    errors: {},
    mailerStatus: ""
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const payLoad = {
      email: this.email.value,
      subject: this.subject.value,
      text: this.text.value
    };
    this.setState({ mailerStatus: "Sending..." });
    try {
      await api.sendInquiry(payLoad);
      this.clearForm();
      this.setState({ errors: {}, mailerStatus: "Success!" });
      setTimeout(() => this.setState({ errors: {}, mailerStatus: "" }), 2000);
    } catch (e) {
      if (!e.response) {
        return console.log(e);
      }
      this.handleStatus(e.response.data);
    }
  };

  handleStatus = status => {
    let err = { errors: {} };
    if (status.expressValidator !== undefined) {
      status.expressValidator.forEach(express_err => {
        err.errors[express_err.param] = express_err.msg;
      });
    }
    this.setState({ ...err, mailerStatus: "Something went wrong!" });
  };

  clearForm = () => {
    this.email.value = "";
    this.subject.value = "";
    this.text.value = "";
  };

  render() {
    return (
      <div style={{ margin: "auto", width: 300 }}>
        <form onSubmit={this.handleFormSubmit}>
          <h2 style={{ textAlign: "center" }}>Inquiry Form</h2>
          <hr />

          <label>Your Email</label>
          <input
            type="email"
            ref={node => {
              this.email = node;
            }}
            autoFocus
            required
            maxLength="100"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.email}
          </span>
          <br />

          <label>Subject</label>
          <input
            type="text"
            ref={node => {
              this.subject = node;
            }}
            required
            maxLength="100"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.subject}
          </span>
          <br />

          <label
            style={{ display: "inline-block", marginTop: 10, marginBottom: 10 }}
          >
            Inquiry message here
            <span style={{ color: "red", marginLeft: 8 }}>
              {this.state.errors.comments}
            </span>
          </label>
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.text}
          </span>
          <textarea
            rows="8"
            ref={node => {
              this.text = node;
            }}
            required
            maxLength="1000"
            style={{ width: "100%", marginBottom: 10 }}
          />

          <input
            type="submit"
            value="Submit!"
            style={{ display: "block", margin: "auto" }}
          />

          <span
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 10
            }}
          >
            {this.state.mailerStatus}
          </span>
        </form>
      </div>
    );
  }
}

export default InquiryForm;
