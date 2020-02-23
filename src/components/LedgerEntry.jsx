import React from "react";

const LedgerEntry = props => {
  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.amount}</td>
      <td>{props.date}</td>
    </tr>
  );
};

export default LedgerEntry;
