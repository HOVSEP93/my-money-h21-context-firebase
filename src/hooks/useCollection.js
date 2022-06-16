import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/Config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    /* Checking if the query is defined and if it is, it is adding the query to the ref. */
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    /* Subscribing to the collection and updating the state when the collection changes. */
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //   update the state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data!");
      }
    );
    return () => unsubscribe();
  }, [collection, query, orderBy]);
  return { documents, error };
};
