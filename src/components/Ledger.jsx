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
  }

  componentDidMount() {
    var docRef = firestore.collection("ledger").doc(this.state.user);

    docRef.onSnapshot(doc => {
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
