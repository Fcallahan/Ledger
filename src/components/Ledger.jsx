import React, { useState, useEffect } from "react";
import LedgerEntry from "./LedgerEntry";
import { firestore } from "../firebase";

const Ledger = ({ user }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async function update() {
      var docRef = firestore.collection("ledger").doc(user);
      let doc = await docRef.get();
      if (doc.exists) {
        //console.log("Document data:", doc.data());
        console.log("Exists");
        const jsonEntries = doc.data().records.map(e => JSON.parse(e));
        setRecords(jsonEntries);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })();
  });

  return (
    <table>
      <thead>
        <tr>
          <th>description</th>
          <th>amount</th>
          <th>date</th>
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
