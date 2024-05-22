export const handleAddToCart = (e, product, data, set) => {
  e.preventDefault();
  if (!data.email) alert("debes loguearte para hacer compras");
  else if (product.stock <= 0 || !product)
    alert("no hay stock de este producto");
  else {
    set({
      ...data,
      cart: [...data.cart, product.name],
    });
    alert("se ha agregado al carrito");
  }
};
