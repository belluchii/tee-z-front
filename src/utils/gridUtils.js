export const handleFilter = (arr, param, string, data) => {
  return arr.filter((elem) => {
    if (!param)
      return (
        elem.name.includes(string ? string.toLowerCase() : "") ||
        elem.tags.includes(string ? string.toLowerCase() : "")
      );
    else if (data[param]) return data[param].includes(elem.name);
    return false;
  });
};
