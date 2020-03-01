import React, { Component } from "react";
import "./App.css";
import AdminLedger from "./components/AdminLedger";
import Ledger from "./components/Ledger";
import { firestore } from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      pw: "",
      user: null
    };
  }

  handleChange = event => {
    this.setState({ pw: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var collectionRef = firestore.collection("ledger");

    var query = collectionRef.where("password", "==", this.state.pw);
    query.get().then(collection => {
      if (collection.size === 1) {
        var user = collection.docs[0].id;
        this.setState({ authenticated: true, user: user });
      } else {
        alert("wrong password");
      }
    });
  };

  render() {
    document.title = "Friendly Ledger";

    let screen = null;
    if (!this.state.authenticated) {
      screen = this.renderLogIn();
    } else {
      screen = this.renderLedger();
    }

    return <div className="my-auto-scroll">{screen}</div>;
  }

  renderLogIn() {
    return (
      <div className="container">
        <div className="row vertical-center">
          <div className="col-xs-12">
            <h1 className="app-title">Friendly Ledger</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                  <div className="col-sm-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Log In
                    </button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  renderLedger() {
    if (this.state.user === "admin") {
      return <AdminLedger />;
    } else {
      return <Ledger user={this.state.user} />;
    }
  }
}

export default App;
