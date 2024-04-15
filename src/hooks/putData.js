import { useEffect } from "react";
import axios from "axios";
export const usePutData = ({ data, setData, email }) => {
  useEffect(() => {
    const putData = async () => {
      if (data && email) {
        try {
          await axios.put("http://localhost:3001/api/users/" + email, data);
          console.log(data.cart);
        } catch (error) {
          console.error("error modificando el usuario", error);
        }
      }
    };
    putData();
  }, [data, setData]);
};
