import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./component/homepage";
import Details from "./component/details";
import Characters from "./component/characters";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/anime-database/" element={<Homepage />}></Route>
        <Route path="/anime-database/details/:id" element={<Details />}></Route>
        <Route
          path="/anime-database/characters/:id"
          element={<Characters />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
