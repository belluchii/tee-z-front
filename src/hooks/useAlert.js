import { useState, useCallback } from "react";

export default function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = "error") => {
    setAlert({ message, type });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return { alert, showAlert, closeAlert };
}
