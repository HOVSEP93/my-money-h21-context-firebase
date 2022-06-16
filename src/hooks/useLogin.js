/**
 * It's a custom hook that handles the login process.
 * @returns An object with the login function, isPending boolean, and error string.
 */
import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // Sign the user out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //   dispatch logout
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
