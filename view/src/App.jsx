import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./components/HomePage";
import LogInPage from "./components/LogIn";
import LibraryPageGame from "./components/LibraryGame";
import LibraryPageCode from "./components/LibraryCode";
import ProfilePage from "./components/ProfilePage";
import CommunityPage from "./components/CommunityPage"
import GamePage from "./components/GamePage";
import MarketGamePage from "./components/MarketGame";
import CodePage from "./components/CodeInforMarket";
import FriendsPage from "./components/FriendPage";
import BadgesPage from "./components/BadgesPage";
import GameModePage from "./components/GameModePage";
import MarketCodePage from "./components/MarketCode";
import SignUpPage from "./components/SignUpPage";
import CodeDetailPage from "./components/CodeDetailPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market-game" element={<MarketGamePage />} />
        <Route path="/market-code" element={<MarketCodePage />} />
        <Route path="/library-game" element={<LibraryPageGame />} />
        <Route path="/library-code" element={<LibraryPageCode />} />
        <Route path="/repository/:id" element={<CodeDetailPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/market-code/:id" element={<CodePage />} />
        <Route path="/library-game/:id" element={<GameModePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
