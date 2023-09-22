import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import MemoryPage from "../_memory/MemoryPage";
import MemoryUploadPage from "../_memory/MemoryUploadPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<TestPage />} /> */}
        <Route path="/" element={<PublicRoute component={<MemoryPage />} />} />
        <Route
          path="/memory/gameupload"
          element={<PublicRoute component={<MemoryUploadPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
