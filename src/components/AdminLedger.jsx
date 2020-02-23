import React, { Component } from "react";
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
      const ids = collection.docs.map(d => d.id).filter(id => id != "admin");
      console.log(ids);

      this.setState({ users: ids });
    });
  }

  handleUserClick = user => {
    this.setState({ user: user });
  };

  render() {
    const users = this.state.users.map(user => (
      <li key={user}>
        <button onClick={() => this.handleUserClick(user)}>{user}</button>
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
          <div>
            {this.state.user ? <Ledger user={this.state.user} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLedger;
