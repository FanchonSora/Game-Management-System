import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import LibraryPageGame from "./components/LibraryGame";
import LibraryPageCode from "./components/LibraryCode";
import ProfilePage from "./components/ProfilePage";
import CommunityPage from "./components/CommunityPage"
import GamePage from "./components/GamePage";
import MarketGamePage from "./components/MarketGame";
import CodePage from "./components/CodePage";
import FriendsPage from "./components/FriendPage";
import BadgesPage from "./components/BadgesPage";
import InventoryPage from "./components/InventoryPage";
import GameModePage from "./components/GameModePage";
import MarketCodePage from "./components/MarketCode";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market-game" element={<MarketGamePage />} />
        <Route path="/market-code" element={<MarketCodePage />} />
        <Route path="/library-game" element={<LibraryPageGame />} />
        <Route path="/library-code" element={<LibraryPageCode />} />
        <Route path="/repository/:id" element={<CodePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/library-game/:id" element={<GameModePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
