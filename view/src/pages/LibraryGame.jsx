// src/components/LibraryPage.jsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import gameData from "../data/gameData"; // Correctly import gameData

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [allGames, setAllGames] = useState([]);

  const marketRef = useRef(null);
  const libraryRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Load library games from local storage
    const storedGames = JSON.parse(localStorage.getItem("libraryGames")) || [];

    // Original games from gameData.js
    const originalGames = gameData.map((game) => ({
      id: game.id,
      name: game.title,
      image: game.image, // Add image path
    }));

    // Merge stored games with original (avoid duplicates)
    const uniqueGames = [...originalGames];
    storedGames.forEach((g) => {
      if (!uniqueGames.find((ug) => ug.id === g.id)) {
        const gameDetail = gameData.find((game) => game.id === g.id);
        if (gameDetail) {
          uniqueGames.push({
            id: gameDetail.id,
            name: gameDetail.title,
            image: gameDetail.image, // Ensure image is included
          });
        }
      }
    });

    setAllGames(uniqueGames);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter the game list based on the search term
  const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (gameId) => {
    navigate(`/library-game/${gameId}`); // Navigate to the specific game's page
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
              style={{ color: "#c7d5e0" }}
            >
              Market
            </NavButton>
            {isMarketDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/market-game">Market Game</DropdownItem>
                <DropdownItem to="/market-code">Market Code</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>

          {/* Community Link */}
          <NavLinkStyled to="/community">Community</NavLinkStyled>

          {/* Library Dropdown */}
          <Dropdown ref={libraryRef}>
            <NavButton
              onClick={() => setLibraryDropdownOpen(!isLibraryDropdownOpen)}
              style={{ color: "#c7d5e0" }}
            >
              Library
            </NavButton>
            {isLibraryDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/home">Home</DropdownItem>
                <DropdownItem to="/library-code">Library Code</DropdownItem>
                <DropdownItem to="/library-game">Library Game</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>

          {/* Profile Dropdown */}
          <Dropdown ref={profileRef}>
            <NavButton
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              style={{ color: "#c7d5e0" }}
            >
              Personal Profile
            </NavButton>
            {isProfileDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/activity">Activity</DropdownItem>
                <DropdownItem to="/profile">Profile</DropdownItem>
                <DropdownItem to="/friends">Friends</DropdownItem>
                <DropdownItem to="/badges">Badges</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavLinks>
      </Navbar>

      {/* Content */}
      <Body>
        {/* Sidebar */}
        <Sidebar>
          <SidebarTitle>Your Library</SidebarTitle>
          {/* Search Bar */}
          <SearchInput
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Game List */}
          <SidebarList>
            {filteredGames.map((game) => (
              <SidebarItem
                key={game.id}
                onClick={() => handleGameClick(game.id)}
              >
                <GameImage src={game.image} alt={game.name} />
                <GameName>{game.name}</GameName>
              </SidebarItem>
            ))}
          </SidebarList>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Section>
            <SectionTitle>Recent Games</SectionTitle>
            <GameGrid>
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  onClick={() => handleGameClick(game.id)}
                >
                  <GameInfo>
                    <GameTitle>{game.name}</GameTitle>
                    <GameImage src={game.image} alt={game.name} />
                  </GameInfo>
                </GameCard>
              ))}
            </GameGrid>
          </Section>
        </MainContent>
      </Body>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color:rgb(7, 21, 34);
  color: #24292e;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Navbar = styled.nav`
  width: 100%;
  background-color: #2d333b;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

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
  color: #c7d5e0;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 38px;
  left: 0;
  background-color: rgba(42, 71, 94, 0.95);
  border-radius: 5px;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 100;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #c7d5e0;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NavLinkStyled = styled(Link)`
  color: #c7d5e0;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

// Body Container
const Body = styled.div`
  display: flex;
  flex: 1;
`;

// Sidebar
const Sidebar = styled.div`
  width: 250px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  padding: 20px;
  border-right: 1px solid #0f2b44;
  box-shadow: 2px 0 8px rgba(0,0,0,0.5);
  overflow-y: auto;
`;

// Sidebar Title
const SidebarTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  font-weight: 500;
`;

// Search Input
const SearchInput = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #66c0f4;
  background-color: #0f1c2c;
  color: #c7d5e0;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #0366d6;
  }
`;

// Sidebar List
const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Sidebar Item
const SidebarItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  color: #c7d5e0;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Game Image in Sidebar
const GameImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

// Game Name in Sidebar
const GameName = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Main Content
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

// Section
const Section = styled.section`
  margin-bottom: 40px;
`;

// Section Title
const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
  font-weight: 500;
`;

// Game Grid
const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

// Game Card
const GameCard = styled.div`
  background-color: rgba(15, 28, 44, 0.85);
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  border: 1px solid #0f2b44;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }
`;

// Game Info
const GameInfo = styled.div`
  margin-top: 10px;
`;

// Game Title
const GameTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #c7d5e0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
`;

// Game Image in Main Content
const GameImageStyled = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
`;

// Additional Styles (if any)

const LibraryPageStyled = styled.div`
  /* Add any additional styles if necessary */
`;

export default LibraryPage;
