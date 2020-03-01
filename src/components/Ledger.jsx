import React, { useState, useEffect } from "react";
import LedgerEntry from "./LedgerEntry";
import { firestore } from "../firebase";

const Ledger = ({ user }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let docRef = firestore.collection("ledger").doc(user);
    docRef.onSnapshot(doc => {
      if (doc.exists) {
        const jsonEntries = doc.data().records.reverse().map(e => JSON.parse(e));
        setRecords(jsonEntries);
      } else {
        console.log(`document (${user}) not found!`);
      }
    });
  }, [user]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, idx) => (
          <LedgerEntry key={idx} {...record} />
        ))}
      </tbody>
    </table>
  );
};

export default Ledger;
