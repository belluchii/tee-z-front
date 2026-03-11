import { createContext, useState } from "react";

const DataContext = createContext();

const getInitialData = () => {
  try {
    const stored = localStorage.getItem("data");
    return stored
      ? JSON.parse(stored)
      : { email: null, favs: null, cart: null, history: null };
  } catch {
    return { email: null, favs: null, cart: null, history: null };
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(getInitialData);

  const setDataPersisted = (newData) => {
    setData(newData);
    try {
      localStorage.setItem("data", JSON.stringify(newData));
    } catch {}
  };

  return (
    <DataContext.Provider value={{ data, setData: setDataPersisted }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
