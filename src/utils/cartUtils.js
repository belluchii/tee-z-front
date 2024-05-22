export const getStock = (title, cart) => {
  return cart.filter((elem) => elem == title).length;
};
export const getTotal = (products, cart) =>
  products.reduce(
    (accumulator, elem) => accumulator + elem.price * getStock(elem.name, cart),
    0
  );

export const addCart = (elem, data, setData) => {
  if (getStock(elem.name, data.cart) < elem.stock) {
    setData({ ...data, cart: [...data.cart, elem.name] });
  } else alert("stock maximo alcanzado");
};

export const removeCart = (elem, data, setData) => {
  setData({
    ...data,
    cart: data.cart.splice(data.cart.lastIndexOf(elem.name), 1) && data.cart,
  });
};
export const removeExcedentCart = (data, elem) => {
  data.cart.splice(
    data.cart.indexOf(elem.name),
    getStock(elem.name, data.cart) - elem.stock
  );
};
export const buyCart = (data, setData, products, reduceProduct) => {
  if (data.cart.length <= 0) alert("carrito vacio");
  else {
    [...new Set(data.cart)].map((elem) => {
      let prod = products.find((prod) => prod.name == elem);
      if (prod.stock < getStock(elem, data.cart))
        alert("hubo un problema de stock al hacer su pedido");
      else reduceProduct(prod._id, prod.stock - getStock(elem, data.cart));
    });
    setData({
      ...data,
      cart: [],
      history: [...data.history, ...data.cart],
    });
  }
};
