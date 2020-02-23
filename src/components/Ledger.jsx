import React, { Component } from "react";
import LedgerEntry from "./LedgerEntry";
import { firestore } from "../firebase";

class Ledger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      user: props.user
    };
    console.log(this.state.user);
  }

  componentDidMount() {
    this.updateUser(this.props.user);
  }

  updateUser(user) {
    if (this.state.unsubscribeCallback) {
      this.state.unsubscribeCallback();
    }

    var docRef = firestore.collection("ledger").doc(user);

    var unsubscribe = docRef.onSnapshot(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const jsonEntries = doc.data().records.map(e => JSON.parse(e));
        this.setState({
          entries: jsonEntries
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });

    this.setState({ unsubscribeCallback: unsubscribe });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      // this.setState({ user: this.props.user });
      this.updateUser(this.props.user);
    }
  }

  componentWillUnmount() {}

  render() {
    const entries = this.state.entries.map((trans, idx) => (
      <LedgerEntry key={idx} {...trans} />
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>description</th>
            <th>amount</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>{entries}</tbody>
      </table>
    );
  }
}

export default Ledger;
