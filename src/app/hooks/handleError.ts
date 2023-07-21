import { useState, useEffect } from "react";

const useErrorMessage = (): [
  string | null,
  (message: string | null) => void
] => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setError = (message: string | null) => {
    setErrorMessage(message);
  };

  useEffect(() => {
    // Your error handling logic here (e.g., show an alert or send error to logging service)
    if (errorMessage) {
      setError("a");
      // console.error("Error:", errorMessage);
    }
  }, [errorMessage]);

  return [errorMessage, setError];
};

export default useErrorMessage;
