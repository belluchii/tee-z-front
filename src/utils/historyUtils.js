export const apilarProductos = (arr) => {
  return arr.reduce((res, prod) => {
    const last = res[res.length - 1];
    if (!last || last.name !== prod) {
      res.push({ name: prod, stock: 1 });
    } else {
      last.stock++;
    }
    return res;
  }, []);
};
