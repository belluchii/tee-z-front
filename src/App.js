import Individual from "./components/Individual/Individual";
import Register from "./components/register/Register";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/context";
import Login from "./components/login/Login";
import Grid from "./components/Grid/Grid";
import Index from "./components/Index";
import Nav from "./common/nav/Nav";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Nav />
        <Routes>
          <Route element={<Individual />} path="/products/:name" />
          <Route element={<Grid favs={true} />} path="/products/favs" />
          <Route element={<Register />} path="/register" />
          <Route element={<Grid />} path="/products" />
          <Route element={<Login />} path="/login" />
          <Route element={<Index />} path="/" />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
