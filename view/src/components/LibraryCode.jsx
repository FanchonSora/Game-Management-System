// GameLibrary.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Keyframes for Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components

// Container
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 20px;
`;

// Navbar
const Navbar = styled.nav`
  width: 100%;
  background-color: #2d333b;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

// Nav Links
const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

// Dropdown Components
const Dropdown = styled.div`
  position: relative;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #c9d1d9;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #24292e;
  border-radius: 6px;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 100;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px 15px;
  color: #c9d1d9;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: #3a424a;
  }
`;

// Simple NavLink
const NavLinkStyled = styled(Link)`
  color: #c9d1d9;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

// Header Section
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div``;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #0366d6;
`;

const ProfileUsername = styled.p`
  margin: 5px 0 0 0;
  color: #586069;
`;

// Tabs
const Tabs = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #f6f8fa;
  }

  &.active {
    background-color: #0366d6;
    color: #fff;
    border-color: #0366d6;
  }
`;

// Search Bar
const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 75%;
  padding: 10px 15px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
`;

const NewButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Game List
const GameList = styled.div``;

// Game Card
const GameCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  }
`;

const GameDetails = styled.div``;

const GameTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #0366d6;
`;

const Language = styled.p`
  margin: 5px 0 0 0;
  color: #586069;
  font-size: 14px;
`;

const Updated = styled.span`
  margin-left: 10px;
  color: #586069;
  font-size: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

// Add Button
const AddButton = styled.button`
  padding: 6px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &.added {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

// View Link
const ViewLink = styled(Link)`
  padding: 6px 12px;
  background-color: #0366d6;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0356b6;
  }
`;

// Notification (Optional)
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: #fff;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-out, fadeIn 0.3s ease-out 2.5s forwards;
  opacity: 0;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;


// GameLibrary Component
const GameLibrary = () => {
  const navigate = useNavigate();

  // State for active tab (Optional)
  const [activeTab, setActiveTab] = useState("Overview");

  // State for added codes
  const [addedCodes, setAddedCodes] = useState([]);

  // State for notification
  const [notification, setNotification] = useState("");

  // Refs for Dropdowns in Navbar
  const marketRef = useRef(null);
  const libraryRef = useRef(null);
  const profileRef = useRef(null);

  // Games Data
  const games = [
    { id: 1, name: "Game-Management-System", language: "JavaScript", updated: "6 hours ago" },
    { id: 2, name: "Matrix-Calculator-Web", language: "HTML", updated: "yesterday" },
    { id: 3, name: "Basic-Chat-Box", language: "Python", updated: "Sep 9" },
    { id: 4, name: "Object-Detection-Game", language: "Python", updated: "Sep 9" },
    { id: 5, name: "Event-Management", language: "TypeScript", updated: "Aug 30" },
  ];

  // Load added codes from localStorage on mount
  useEffect(() => {
    const storedCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];
    setAddedCodes(storedCodes);
  }, []);

  // Click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (marketRef.current && !marketRef.current.contains(event.target)) {
        setMarketDropdownOpen(false);
      }
      if (libraryRef.current && !libraryRef.current.contains(event.target)) {
        setLibraryDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // State for Dropdowns
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Function to handle adding code to library
  const handleAddCode = (game) => {
    if (!addedCodes.find((code) => code.id === game.id)) {
      const updatedCodes = [...addedCodes, game];
      setAddedCodes(updatedCodes);
      localStorage.setItem("libraryCodes", JSON.stringify(updatedCodes));
      setNotification(`${game.name} has been added to your library!`);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <Container>
      {/* Top Navigation Bar */}
      <Navbar>
        <NavLinks>
          {/* Market Dropdown */}
          <Dropdown ref={marketRef}>
            <NavButton
              onClick={() => setMarketDropdownOpen(!isMarketDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isMarketDropdownOpen}
            >
              Market
            </NavButton>
            {isMarketDropdownOpen && (
              <DropdownMenu>
                <DropdownItem href="/market-game">Market Game</DropdownItem>
                <DropdownItem href="/market-code">Market Code</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>

          {/* Community Link */}
          <NavLinkStyled to="/community">Community</NavLinkStyled>

          {/* Library Dropdown */}
          <Dropdown ref={libraryRef}>
            <NavButton
              onClick={() => setLibraryDropdownOpen(!isLibraryDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isLibraryDropdownOpen}
            >
              Library
            </NavButton>
            {isLibraryDropdownOpen && (
              <DropdownMenu>
                <DropdownItem href="/library-code">Library Code</DropdownItem>
                <DropdownItem href="/library-game">Library Game</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>

          {/* Profile Dropdown */}
          <Dropdown ref={profileRef}>
            <NavButton
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isProfileDropdownOpen}
            >
              Personal Profile
            </NavButton>
            {isProfileDropdownOpen && (
              <DropdownMenu>
                <DropdownItem href="/activity">Activity</DropdownItem>
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem href="/friends">Friends</DropdownItem>
                <DropdownItem href="/badges">Badges</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavLinks>
      </Navbar>

      {/* Header Section */}
      <Header>
        <ProfilePicture
          src="https://via.placeholder.com/100"
          alt="Profile"
        />
        <ProfileInfo>
          <ProfileName>Fanchon_Sora</ProfileName>
          <ProfileUsername>@FanchonSora</ProfileUsername>
        </ProfileInfo>
      </Header>

      {/* Tabs */}
      <Tabs>
        {["Overview", "Repositories", "Projects", "Packages", "Stars"].map((tab) => (
          <TabButton
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </Tabs>

      {/* Search Bar */}
      <SearchBar>
        <SearchInput type="text" placeholder="Find a repository..." />
        <NewButton>New</NewButton>
      </SearchBar>

      {/* Game/List */}
      <GameList>
        {games.map((game) => (
          <GameCard key={game.id}>
            <GameDetails>
              <GameTitle>{game.name}</GameTitle>
              <Language>
                {game.language} <Updated>Updated {game.updated}</Updated>
              </Language>
            </GameDetails>
            <Actions>
              <AddButton
                onClick={() => handleAddCode(game)}
                disabled={addedCodes.some((code) => code.id === game.id)}
                className={addedCodes.some((code) => code.id === game.id) ? "added" : ""}
              >
                {addedCodes.some((code) => code.id === game.id) ? "Added" : "Add Code"}
              </AddButton>
              <ViewLink to={`/repository/${game.id}`}>View</ViewLink>
            </Actions>
          </GameCard>
        ))}
      </GameList>

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default GameLibrary;


