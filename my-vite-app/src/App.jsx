import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import LibraryPageGame from "./components/LibraryGame";
import LibraryPageCode from "./components/LibraryCode";
import ProfilePage from "./components/ProfilePage";
import CommunityPage from "./components/CommunityPage"
import GamePage from "./components/GamePage";
import MarketPage from "./components/Market";
import CodePage from "./components/CodePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/library-game" element={<LibraryPageGame />} />
        <Route path="/library-code" element={<LibraryPageCode />} />
        <Route path="/repository/:id" element={<CodePage />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
