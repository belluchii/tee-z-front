export const getStock = (id, cart) => {
  return cart.filter((elem) => elem === id).length;
};

export const getTotal = (products, cart) =>
  products.reduce(
    (accumulator, elem) => accumulator + elem.price * getStock(elem._id, cart),
    0,
  );

export const addCart = (elem, data, setData, showAlert) => {
  if (getStock(elem._id, data.cart) < elem.stock) {
    setData({ ...data, cart: [...data.cart, elem._id] });
  } else showAlert("stock máximo alcanzado", "warning");
};

export const removeCart = (elem, data, setData) => {
  const cart = [...data.cart];
  cart.splice(cart.lastIndexOf(elem._id), 1);
  setData({ ...data, cart });
};

export const removeExcedentCart = (data, elem) => {
  data.cart.splice(
    data.cart.indexOf(elem._id),
    getStock(elem._id, data.cart) - elem.stock,
  );
};

export const buyCart = (data, setData, products, reduceProduct, showAlert) => {
  if (data.cart.length <= 0) {
    showAlert("carrito vacío", "warning");
    return;
  }

  const hasStockIssue = [...new Set(data.cart)].some((elem) => {
    const prod = products.find((prod) => prod._id === elem);
    return prod.stock < getStock(elem, data.cart);
  });

  if (hasStockIssue) {
    showAlert("hubo un problema de stock al hacer su pedido", "error");
    return;
  }

  [...new Set(data.cart)].forEach((elem) => {
    const prod = products.find((prod) => prod._id === elem);
    reduceProduct(prod._id, prod.stock - getStock(elem, data.cart));
  });

  setData({
    ...data,
    cart: [],
    history: [...data.history, ...data.cart],
  });

  showAlert("compra realizada con éxito", "success");
};
