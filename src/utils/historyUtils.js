export const apilarProductos = (arr) => {
  return arr.reduce((res, id) => {
    const last = res[res.length - 1];
    if (!last || last._id !== id) {
      res.push({ _id: id, stock: 1 });
    } else {
      last.stock++;
    }
    return res;
  }, []);
};
