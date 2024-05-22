import axios from "axios";

export const getProducts = async () => {
  try {
    return await axios.get(process.env.REACT_APP_API_KEY + "/api/products");
  } catch (error) {
    console.error(error);
  }
};

export const getOneProduct = async (name) => {
  try {
    return await axios.get(
      process.env.REACT_APP_API_KEY + "/api/products/" + name
    );
  } catch (error) {
    console.error(error);
  }
};

export const getByTag = async (tag) => {
  try {
    return await axios.get(
      process.env.REACT_APP_API_KEY + "/api/products/tags/" + tag
    );
  } catch (error) {
    console.error(error);
  }
};

export const reduceProduct = async (id, stock) => {
  try {
    return await axios.put(
      process.env.REACT_APP_API_KEY + "/api/products/" + id,
      {
        stock: stock,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
