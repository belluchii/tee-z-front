import { useEffect } from "react";

export const useFetchData = ({ func, set, params = null }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await func(params);
        //hacemos nuestro pedido axios
        set(response.data);
        //seteamos la data en un estado
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [func, set]);
};
