import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import MemoryGame from "../_memoryGame/MemoryGame";
import TicTacToeGame from "../_ticTacToeGame/TicTacToeGame";
import LandingPage from "../_landingPage/LandingPage";
import GamesPage from "../_gamePage/GamesPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute component={<LandingPage />} />} />
        <Route
          path="/games"
          element={<PublicRoute component={<GamesPage />} />}
        />
        <Route
          path="/games/memory"
          element={<PublicRoute component={<MemoryGame />} />}
        />
        <Route
          path="/games/tictactoe"
          element={<PublicRoute component={<TicTacToeGame />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
