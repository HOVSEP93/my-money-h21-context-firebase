/**
 * It's a form that takes in a transaction name and amount, and then adds it to the database.
 * @returns a function.
 */
import { Fragment, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const { addDocument, response } = useFirestore("transactions");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid, name, amount });
  };

  /* It's clearing the form after a successful submission. */
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <Fragment>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Amount ($)</span>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </Fragment>
  );
};

export default TransactionForm;
