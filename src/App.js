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
      pw: ""
    };
  }

  render() {
    let stuff = null;
    if (!this.state.authenticated) {
      stuff = this.renderLogIn();
    } else {
      stuff = this.renderLedger();
    }

    return <div className="container">{stuff}</div>;
  }

  handleChange = event => {
    this.setState({ pw: event.target.value });
  };

  // { "description": "new shoes", "amount": 90.0, "date": "2020-02-20" }
  // { "description": "new maw", "amount": 90.0, "date": "2020-02-21" }

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

  renderLogIn() {
    return (
      <div>
        <h1>FRANK'S MONEY</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Password:
            <input type="text" name="pass" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
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
