import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";
import TrachIcon from "../../assets/trashcan.svg";

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <img
            className="delete-trach"
            src={TrachIcon}
            alt="delete"
            onClick={() => deleteDocument(transaction.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
