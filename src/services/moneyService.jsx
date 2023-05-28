import React from 'react';

function MoneyNumber(props) {
  const { amount } = props;

  // Format the number with commas
  const formattedAmount = amount.toLocaleString();

  return <span>{formattedAmount}</span>;
}

export default MoneyNumber;