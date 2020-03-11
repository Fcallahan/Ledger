import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import { firestore } from "../firebase";
import Ledger from "./Ledger";
import Balance from "./Balance";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AdminLedger = () => {
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
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

  const clearInputs = () => {
    setAmount();
    setDate("");
    setDescription("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    clearInputs();

    var docRef = firestore.collection("ledger").doc(user);
    docRef.update({
      records: firebase.firestore.FieldValue.arrayUnion(
        JSON.stringify({
          description: description,
          amount: Number(amount),
          date: date
        })
      )
    });
  };

  const handleUserSelect = userId => {
    clearInputs();
    setUser(userId);
  };

  const users = userIds.map(userId => {
    let classNames = ["list-group-item"];
    if (userId === user) {
      classNames.push("active");
    }

    return (
      <div key={userId} className={classNames.join(" ")} onClick={() => handleUserSelect(userId)}>
        {userId}
        <span className="float-right">
          <Balance userId={userId} />
        </span>
      </div>
    );
  });

  return (
    <div className="row">
      <div className="col-md my-auto-scroll">
        <h3 className="app-title">Users</h3>
        <ul className="list-group">{users}</ul>
      </div>
      <div className="col-md my-auto-scroll">
        <h3 className="app-title">{user}</h3>
        {user && (
          <div>
            <form className="row" onSubmit={handleSubmit}>
              <div className="col-md input-group">
                <input
                  type="text"
                  placeholder="description"
                  className="form-control"
                  onChange={event => setDescription(event.target.value)}
                  value={description}
                />
              </div>
              <div className="col-md">
                <input
                  type="number"
                  className="form-control"
                  placeholder="amount"
                  onChange={event => setAmount(event.target.value)}
                  value={amount}
                />
              </div>
              <div className="col-md input-group">
                <ReactDatePicker
                  className="form-control"
                  selected={date}
                  placeholderText="mm/dd/yyyy"
                  onChange={date => setDate(date)}
                />
              </div>
              <div className="col-md">
                <input className="btn btn-primary form-control" type="submit" value="Add Entry" />
              </div>
            </form>
            <Ledger user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLedger;
