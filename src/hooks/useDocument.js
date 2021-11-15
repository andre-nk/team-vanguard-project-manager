import { useEffect, useState } from "react";
import { firestoreTools } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = firestoreTools.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("Project is not found. Try again!");
        }
      },
      (error) => {
        console.log(error);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
