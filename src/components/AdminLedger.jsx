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

  const users = userIds.map(userId => {
    let classNames = ["list-group-item"];
    if (userId === user) {
      classNames.push("active");
    }

    return (
      <li
        key={userId}
        className={classNames.join(" ")}
        onClick={() => setUser(userId)}>
        {userId}
      </li>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h3>Users</h3>
          <ul className="list-group">{users}</ul>
        </div>
        <div className="col-9">
          <h3>{user}</h3>
          {user && (
            <div className="container">
              <Ledger user={user} />
              <form className="row" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div>
                    <input
                      type="text"
                      placeholder="description"
                      onChange={event => setDescription(event.target.value)}
                    />
                  </div>
                  <div className="m-left">
                    <input
                      type="text"
                      placeholder="amount"
                      onChange={event => setAmount(event.target.value)}
                    />
                  </div>
                  <div className="m-left">
                    <input
                      type="date"
                      onChange={event => setDate(event.target.value)}
                    />
                  </div>
                  <div className="m-left">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="add entry"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLedger;
