import { useEffect } from "react";
import axios from "axios";
export const usePutData = ({ data, setData }) => {
  useEffect(() => {
    const putData = async () => {
      if (data && data.email) {
        try {
          await axios.put(
            "http://localhost:3001/api/users/" + data.email,
            data
          );
        } catch (error) {
          console.error("error modificando el usuario", error);
        }
      }
    };
    putData();
  }, [data, setData]);
};
