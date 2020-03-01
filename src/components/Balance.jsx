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

  function sum() {
    let sum = 0;
    for (let rec of records) {
      sum += rec.amount;
      console.log(rec);
      console.log(JSON.stringify(rec));
    }

    return sum;
  }

  return (
    <span className="table">
      <tbody>
        <b> {sum()}</b>
      </tbody>
    </span>
  );
};
export default Balance;
