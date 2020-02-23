import React, { Component } from "react";
import * as firebase from "firebase";

import { firestore } from "../firebase";
import Ledger from "./Ledger";

class AdminLedger extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [], user: null };
  }

  componentDidMount() {
    var ledger = firestore.collection("ledger");
    ledger.get().then(collection => {
      const ids = collection.docs.map(d => d.id).filter(id => id !== "admin");
      console.log(ids);

      this.setState({ users: ids });
    });
  }

  handleUserSelect = user => {
    this.setState({ user: user });
  };

  handleSubmit = event => {
    event.preventDefault();
    var docRef = firestore.collection("ledger").doc(this.state.user);
    docRef.update({
      records: firebase.firestore.FieldValue.arrayUnion(
        JSON.stringify({
          description: this.state.description,
          amount: this.state.amount,
          date: this.state.date
        })
      )
    });
  };

  handleAmount = event => {
    this.setState({ amount: event.target.value });
  };

  handleDate = event => {
    this.setState({ date: event.target.value });
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  render() {
    const users = this.state.users.map(user => (
      <li key={user}>
        <button onClick={() => this.handleUserSelect(user)}>{user}</button>
      </li>
    ));
    return (
      <div>
        <div>
          <h3>Users</h3>
          <ul>{users}</ul>
        </div>
        <div>
          <h3>{this.state.user}</h3>
          {this.state.user && (
            <div>
              <Ledger user={this.state.user} />
              <form onSubmit={this.handleSubmit}>
                <p>{this.state.user}</p>
                <input
                  type="text"
                  placeholder="description"
                  onChange={this.handleDescription}
                />
                <input
                  type="text"
                  className="inputTest"
                  placeholder="amount"
                  onChange={this.handleAmount}
                />
                <input
                  className="inputTest"
                  type="date"
                  onChange={this.handleDate}
                />
                <input className="inputTest" type="submit" value="add entry" />
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AdminLedger;
