import React from "react";

const LedgerEntry = ({ description, amount, date }) => {
  let formattedAmount = amount;

  if (amount < 0) {
    formattedAmount = "-$" + -amount;
  } else if (amount > 0) {
    formattedAmount = "+$" + amount;
  }

  return (
    <tr className={amount > 0 ? "table-success" : "table-warning"}>
      <td>{description}</td>
      <td>{formattedAmount}</td>
      <td>{date}</td>
    </tr>
  );
};

export default LedgerEntry;
