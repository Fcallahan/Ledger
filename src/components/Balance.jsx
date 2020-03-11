import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";

const Balance = ({ userId }) => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    let docRef = firestore.collection("ledger").doc(userId);
    docRef.onSnapshot(doc => {
      if (doc.exists) {
        const jsonEntries = doc
          .data()
          .records.reverse()
          .map(e => JSON.parse(e));
        setRecords(jsonEntries);
      } else {
        console.log(`document (${userId}) not found!`);
      }
    });
  }, [userId]);

  let sum = 0;
  for (let rec of records) {
    sum += rec.amount;
    console.log(rec);
    console.log(JSON.stringify(rec));
  }

  return (
    <span className={`badge badge-pill ${sum >= 0 ? "badge-success" : "badge-danger"}`}>
      <b> {sum}</b>
    </span>
  );
};
export default Balance;
