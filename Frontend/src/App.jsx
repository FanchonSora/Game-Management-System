import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogIn";
import LibraryPageGame from "./pages/library/LibraryGame";
import LibraryPageCode from "./pages/library/LibraryCode";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import MarketGamePage from "./pages/market/MarketGame";
import FriendsPage from "./pages/FriendPage";
import BadgesPage from "./pages/BadgesPage";
import GameDetailPage from "./pages/market/GameDetailPage";
import MarketCodePage from "./pages/market/MarketCode";
import SignUpPage from "./pages/SignUpPage";
import CodeDetailPage from "./pages/library/CodeDetailPage";
import EditProfile from "./pages/EditProfile";
import CodeDetailMarket from "./pages/market/CodeDetailMarket";
import LibraryGameDetailPage from "./pages/library/LibraryGameDetailPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market-game" element={<MarketGamePage />} />
        <Route path="/market-code" element={<MarketCodePage />} />
        <Route path="/library-game" element={<LibraryPageGame />} />
        <Route path="/library-game/:id" element={<LibraryGameDetailPage />} />
        <Route path="/library-code" element={<LibraryPageCode />} />
        <Route path="/library-code/:id" element={<CodeDetailPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/market-game/:id" element={<GameDetailPage />} />
        <Route path="/market-code/:id" element={<CodeDetailMarket />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
