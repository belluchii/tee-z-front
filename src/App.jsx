import Individual from "./components/Individual/Individual";
import Register from "./components/register/Register";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/context";
import Login from "./components/login/Login";
import Grid from "./components/Grid/Grid";
import Index from "./components/Index";
import Nav from "./common/nav/Nav";
import "./App.css";
import History from "./common/history/History";
import Footer from "./common/footer/Footer";
import FavsGrid from "./components/FavsGrid/FavsGrid";
import { usePutData } from "./hooks/putData";
import { useContext } from "react";
import DataContext from "./context/context";
import NotFound from "./components/NotFound/NotFound";

function AppInner() {
  const { data, setData } = useContext(DataContext);
  usePutData({ data, setData });

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<Individual />} path="/products/:id" />
        <Route element={<FavsGrid />} path="/products/favs" />
        <Route element={<History />} path="/products/history" />
        <Route element={<Register />} path="/register" />
        <Route element={<Grid />} path="/products" />
        <Route element={<Login />} path="/login" />
        <Route element={<Index />} path="/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AppInner />
    </DataProvider>
  );
}

export default App;
