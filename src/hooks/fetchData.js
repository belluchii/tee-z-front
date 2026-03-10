import { useEffect } from "react";

export const useFetchData = ({ func, set, params = null }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await func(params);
        set(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [params]);
};

export const useFetchMultipleData = ({ func, set, arr }) => {
  const arrKey = JSON.stringify(arr);

  useEffect(() => {
    if (!arr.length) return;

    const fetchMultipleData = async () => {
      try {
        const promises = arr.map(async (params) => {
          const response = await func(params);
          return response.data;
        });

        const results = await Promise.all(promises);
        set(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchMultipleData();
  }, [arrKey]);
};
