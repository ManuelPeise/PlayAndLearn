import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import MemoryGame from "../_memoryGame/MemoryGame";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute component={<MemoryGame />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
