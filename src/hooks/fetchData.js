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
  }, [params]);
};

export const useFetchMultipleData = ({ func, set, arr }) => {
  useEffect(() => {
    const fetchMultipleData = async () => {
      try {
        // Mapeamos cada elemento de arr a una promesa que llama a func
        if (arr.length >= 1) {
          const promises = arr.map(async (params) => {
            const response = await func(params);
            return response.data;
          });

          // Esperamos a que todas las promesas se resuelvan
          const results = await Promise.all(promises);

          // Actualizamos el estado con todos los datos recibidos
          set(results);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchMultipleData();
  }, []);
};
