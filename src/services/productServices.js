import axios from "axios";

export const getProducts = async () => {
  try {
    return await axios.get("http://localhost:3001/api/products");
  } catch (error) {
    console.error(error);
  }
};

export const getOneProduct = async (name) => {
  try {
    return await axios.get("http://localhost:3001/api/products/" + name);
  } catch (error) {
    console.error(error);
  }
};
