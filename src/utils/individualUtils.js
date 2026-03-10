export const handleAddToCart = (e, product, data, set, showAlert) => {
  e.preventDefault();
  if (!data.email) {
    showAlert("debes loguearte para hacer compras", "warning");
    return;
  }
  if (!product || product.stock <= 0) {
    showAlert("no hay stock de este producto", "error");
    return;
  }
  set({ ...data, cart: [...data.cart, product._id] });
  showAlert("se ha agregado al carrito", "success");
};
