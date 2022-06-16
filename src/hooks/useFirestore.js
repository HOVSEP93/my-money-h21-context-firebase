import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/Config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR_MESSAGE":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADD_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //   Collection ref
  const ref = projectFirestore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //   Add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addDocument });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR_MESSAGE", payload: error.message });
    }
  };

  //   Delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  //   Clean up function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
