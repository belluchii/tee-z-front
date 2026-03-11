import axios from "axios";

const BASE = process.env.REACT_APP_API_KEY + "/api/products";

export const getProducts = async ({
  string,
  categories,
  colors,
  priceMin,
  priceMax,
  page = 1,
  limit = 12,
} = {}) => {
  try {
    return await axios.get(BASE + "/search", {
      params: {
        name: string || "",
        tags: JSON.stringify(categories || []),
        color: JSON.stringify(colors || []),
        priceMin: priceMin ?? 0,
        priceMax: priceMax ?? 50000,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOneProduct = async (id) => {
  try {
    return await axios.get(BASE + "/" + id);
  } catch (error) {
    console.error(error);
  }
};

export const getTags = async () => {
  try {
    return await axios.get(BASE + "/tags/");
  } catch (error) {
    console.error(error);
  }
};

export const getByTag = async ({ tag, page = 1, limit = 12 }) => {
  try {
    return await axios.get(BASE + "/tags/" + tag, { params: { page, limit } });
  } catch (error) {
    console.error(error);
  }
};

export const reduceProduct = async (id, stock) => {
  try {
    return await axios.put(BASE + "/" + id, { stock });
  } catch (error) {
    console.error(error);
  }
};
