/**
 * The Home component renders a TransactionForm and a TransactionList. The TransactionList is populated
 * with the documents from the transactions collection.
 * @returns The return statement is returning a JSX element.
 */
import React from "react";
import TransactionForm from "./TransactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
// style
import styles from "./Home.module.css";
import TransactionList from "./TransactionList";

const Home = () => {
  const { user } = useAuthContext();
  const { error, documents } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
