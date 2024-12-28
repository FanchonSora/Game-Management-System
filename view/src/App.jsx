import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogIn";
import LibraryPageGame from "./pages/LibraryGame";
import LibraryCode from "./pages/LibraryCode";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import MarketGamePage from "./pages/MarketGame";
import GameDetailPage from "./pages/GameDetailPage";
import FriendsPage from "./pages/FriendPage";
import BadgesPage from "./pages/BadgesPage";
import MarketCodePage from "./pages/MarketCode";
import SignUpPage from "./pages/SignUpPage";
import CodeDetailPage from "./pages/CodeDetailPage";
import SupportBot from "./pages/SupportBotPage";
import ActivityPage from "./pages/ActivityPage";
import CodeDetailMarket from "./pages/CodeDetailMarket";

import UserProgressPage from "./pages/UserProgressPage";
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
        <Route path="/library-code" element={<LibraryCode />} />
        <Route path="/library-code/:id" element={<CodeDetailPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/market-game/:id" element={<GameDetailPage />} />
        <Route path="/market-code/:id" element={<CodeDetailMarket />} />
        <Route path="/library-game/:id" element={<UserProgressPage />} />
        <Route path="/support-bot" element={<SupportBot />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
