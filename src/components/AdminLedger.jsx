import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import { firestore } from "../firebase";
import Ledger from "./Ledger";

const AdminLedger = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    var ledger = firestore.collection("ledger");
    (async function getUsers() {
      const collection = await ledger.get();
      const ids = collection.docs.map(d => d.id).filter(id => id !== "admin");
      console.log(ids);

      setUserIds(ids);
    })();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    var docRef = firestore.collection("ledger").doc(user);
    docRef.update({
      records: firebase.firestore.FieldValue.arrayUnion(
        JSON.stringify({
          description: description,
          amount: amount,
          date: date
        })
      )
    });
  };

  const users = userIds.map(user => (
    <li key={user}>
      <button onClick={() => setUser(user)}>{user}</button>
    </li>
  ));

  return (
    <div>
      <div>
        <h3>Users</h3>
        <ul>{users}</ul>
      </div>
      <div>
        <h3>{user}</h3>
        {user && (
          <div>
            <Ledger user={user} />
            <form onSubmit={handleSubmit}>
              <p>{user}</p>
              <input
                type="text"
                placeholder="description"
                onChange={event => setDescription(event.target.value)}
              />
              <input
                type="text"
                className="inputTest"
                placeholder="amount"
                onChange={event => setAmount(event.target.value)}
              />
              <input
                className="inputTest"
                type="date"
                onChange={event => setDate(event.target.value)}
              />
              <input className="inputTest" type="submit" value="add entry" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLedger;
