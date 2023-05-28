import React from 'react';

function MoneyNumber(props) {
  let { amount } = props;

  // Convert string to number if amount is a string
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  // Format the number with commas
  const formattedAmount = amount.toLocaleString();

  return <span>{formattedAmount}</span>;
}

export default MoneyNumber;
