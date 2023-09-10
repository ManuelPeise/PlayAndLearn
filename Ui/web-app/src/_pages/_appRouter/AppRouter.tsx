import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import MemoryPage from "../_memory/MemoryPage";
import MemorySettingsPage from "../_memory/MemorySettingsPage";
import TestPage from "../_dev/TestPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route
          path="/memory"
          element={<PublicRoute component={<MemoryPage />} />}
        />
        <Route
          path="/memory/gameupload"
          element={<PublicRoute component={<MemorySettingsPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
