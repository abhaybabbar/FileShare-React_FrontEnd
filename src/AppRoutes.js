import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import FilesDownload from "./FilesDownload";

export default function AppRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/:slug" element={<FilesDownload />} />
          <Route exact path="/" element={<App />} />
        </Routes>
      </div>
    </Router>
  );
}
