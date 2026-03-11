import { useState, useCallback } from "react";

// Hook personalizado useIsLoading
const useIsLoading = (bool = false) => {
  const [isLoading, setIsLoading] = useState(bool);

  const withLoading = useCallback(async (asyncFunc) => {
    setIsLoading(true);
    try {
      await asyncFunc();
    } catch (error) {
      // Manejar el error si es necesario
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, withLoading];
};

export default useIsLoading;
