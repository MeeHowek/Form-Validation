import React from "react";
import { render } from "react-dom";
import styles from "/style.css";

class Formularz extends React.Component {
  state = {
    username: "",
    email: "",
    phonenumber: "",
    accept: false,
    message: "",

    errors: {
      username: false,
      email: false,
      phonenumber: false,
      accept: false
    }
  };
  messages = {
    username_incorrect:
      "Imie musi zawierać conajmniej 4 znaki i nie może zawierać spacji",
    email_incorrect: "Brak @ lub email zawiera spację",
    phonenumber_incorrect: "Numer telefonu musi zawierać 9 znaków",
    accept_incorrect: "Nie potwierdzona zgoda"
  };

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "tel" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.formValidation();

    if (validation.isCorrect) {
      this.setState({
        username: "",
        email: "",
        phonenumber: "",
        accept: false,
        message: "Formularz został wysłany",

        errors: {
          username: false,
          email: false,
          phonenumber: false,
          accept: false
        }
      });
    } else {
      this.setState({
        errors: {
          username: !validation.isUsernameValid,
          email: !validation.isEmailValid,
          phonenumber: !validation.isPhoneNumberValid,
          accept: !validation.isAccept
        }
      });
    }
  };

  formValidation() {
    let isUsernameValid = false;
    let isEmailValid = false;
    let isPhoneNumberValid = false;
    let isAccept = false;
    let isCorrect = false;

    const { username, email, phonenumber } = this.state;

    if (username.length > 3 && username.indexOf(" ") === -1) {
      isUsernameValid = true;
    }

    if (email.indexOf("@") !== -1 && email.indexOf(" ") === -1) {
      isEmailValid = true;
    }

    if (phonenumber.length === 9 && !isNaN(this.state.phonenumber)) {
      isPhoneNumberValid = true;
    }
    console.log(this.state.accept);
    if (this.state.accept) {
      isAccept = true;
    }

    if (username && email && phonenumber && isAccept) {
      isCorrect = true;
    }

    return {
      isUsernameValid,
      isEmailValid,
      isPhoneNumberValid,
      isAccept,
      isCorrect
    };
  }

  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: ""
          }),
        5000
      );
    }
  }

  render() {
    return (
      <>
        <body>
          <div className="wrapper">
            <h1 className="header">Dane personalne</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="form-input-wrapper">
                <label className="label" htmlFor="user">
                  Twoje imię <span className="star">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  id="user"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <p className="error">
                  {this.state.errors.username
                    ? this.messages.username_incorrect
                    : ""}
                </p>
              </div>
              <h1 className="header">Dane kontaktowe</h1>
              <div className="form-input-wrapper">
                {" "}
                <label className="label" htmlFor="email">
                  Twój email <span className="star">*</span>{" "}
                </label>
                <input
                  className="input"
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <p className="error">
                  {this.state.errors.email ? this.messages.email_incorrect : ""}
                </p>
              </div>
              <div className="form-input-wrapper">
                <label className="label" htmlFor="phonenumber">
                  Twój numer telefonu <span className="star">*</span>{" "}
                </label>
                <input
                  className="input"
                  type="tel"
                  id="phone"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.handleChange}
                />

                <p className="error">
                  {this.state.errors.phonenumber
                    ? this.messages.phonenumber_incorrect
                    : ""}
                </p>
              </div>
              <div className="confirm-box" htmlFor="accept">
                {" "}
                <label>
                  <input
                    type="checkbox"
                    id="accept"
                    name="accept"
                    checked={this.state.accept}
                    onChange={this.handleChange}
                  />{" "}
                  Wyrażam zgodę na przetwarzanie moich danych przez firmę X{" "}
                  <span className="star">*</span>
                </label>
              </div>

              <p className="error-check">
                {this.state.errors.accept ? this.messages.accept_incorrect : ""}
              </p>

              <button>Zapisz się</button>
            </form>
            {this.state.message && <h3>{this.state.message}</h3>}
          </div>
        </body>
      </>
    );
  }
}
render(<Formularz />, document.getElementById("root"));



render (<Formularz />, document.getElementById("root"));