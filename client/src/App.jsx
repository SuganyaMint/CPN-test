import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import './App.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Default Layout */}
        <Route path="/*" element={<IndexPage />} />

        {/* Admin Layout */}
        {/* <Route path="/admin/*" element={<AdminIndex />} /> */}


      </Routes>
    </Suspense>
  );
}

export default App;
