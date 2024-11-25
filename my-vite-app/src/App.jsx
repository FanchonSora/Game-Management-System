import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import LibraryPageGame from "./components/LibraryGame";
import LibraryPageCode from "./components/LibraryCode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/library-game" element={<LibraryPageGame />} />
        <Route path="/library-code" element={<LibraryPageCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
