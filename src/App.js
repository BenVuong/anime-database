import React, {useState, useContext} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./component/homepage";
import Details from "./component/details";
import Characters from "./component/characters";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnimeDBContext } from './helper/Contexts';
function App() {
  const [pageNum, setPageNum] = useState(1)
  return (
    <BrowserRouter>
    <AnimeDBContext.Provider value={{pageNum, setPageNum}}>
      <Routes>
        <Route path="/anime-database/" element={<Homepage />}></Route>
        <Route path="/anime-database/details/:id" element={<Details />}></Route>
        <Route
          path="/anime-database/characters/:id"
          element={<Characters />}
        ></Route>
      </Routes>
    </AnimeDBContext.Provider>
    </BrowserRouter>
  );
}

export default App;
