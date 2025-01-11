// File: src/pages/LibraryPage.jsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaPlus } from "react-icons/fa";
import Navbar from "../../components/Navbar"; 

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// =============== Styled Components ===============

// Container
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #2a2a3d; /* Dark blue background */
  color: #c7d5e0;           /* Light gray text */
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  /* Overlay for better text readability */
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  /* Ensure content is above the overlay */
  > * {
    position: relative;
    z-index: 1;
  }
`;

// Body Container
const Body = styled.div`
  display: flex;
  flex: 1;
`;

// Sidebar
const Sidebar = styled.div`
  width: 300px;
  margin-top: 2rem;
  background: #2a2a3d;
  backdrop-filter: blur(8px);
  padding: 20px;
  border-right: 1px solid #0f2b44;
  border-radius: 8px 8px 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid rgb(255, 255, 255); /* Fixed missing space */
  background-color: #0f1c2c;
  color: #c7d5e0;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: rgb(255, 255, 255);
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

// Game Image (sidebar)
const GameImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

// Game Name (sidebar)
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
  color: rgb(255, 255, 255);
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
  background-color: #2a2a3d;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  box-shadow:  0 4px 15px rgba(0, 0, 0, 0.1);
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

// Game Image (main content)
const GameImageStyled = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
`;

// Sort & Add
const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

// Sort Select
const SortSelect = styled.select`
  background-color: #0f1c2c;
  color: #c7d5e0;
  border: 1px solid rgb(255, 255, 255); /* Fixed missing space */
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    border-color: rgb(255, 255, 255);
  }
`;

// Add Game Button
const AddGameButton = styled.button`
  background-color: rgb(199, 90, 246);
  color: #1e1e2e;
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(184, 81, 228, 0.5);
  }
`;

// Modal Overlay
const ModalOverlay = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

// Modal Content
const ModalContent = styled.div`
  background-color: #2a2a3d;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  color: #c7d5e0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
`;

// Modal Title
const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
`;

// Modal Form
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Modal Input
const ModalInput = styled.input`
  background-color: #0f1c2c;
  color: #c7d5e0;
  border: 1px solid rgb(199, 90, 246);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #aab2bd;
  }

  &:focus {
    border-color: rgb(193, 68, 247);
  }
`;

// Modal Buttons
const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// Button chung cho Modal
const ModalButton = styled.button`
  background-color: ${(props) => (props.primary ? "rgb(199, 90, 246)" : "rgb(199, 90, 246)")};
  color: ${(props) => (props.primary ? "#fff" : "#fff")};
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "rgb(199, 90, 246)" : "rgb(199, 90, 246)")};
  }
`;

// Notification
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgb(199, 90, 246); /* Green for success */
  color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.4);
  animation: ${fadeIn} 0.3s ease-out, ${fadeOut} 0.3s ease-out 2.5s forwards;
  opacity: 1;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 90%;
    right: 5%;
  }
`;

// =============== Main Component ===============
const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allGames, setAllGames] = useState([]);

  // State for sorting
  const [sortOption, setSortOption] = useState("title-asc");

  // State for modal
  const [showModal, setShowModal] = useState(false);

  // State for new game info
  const [newGame, setNewGame] = useState({
    title: "",
    image: "",
  });

  // State for Notification
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  // Load games from localStorage on mount
  useEffect(() => {
    const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];
    setAllGames(libraryGames);
  }, []);

  // Function to handle game click
  const handleGameClick = (gameId) => {
    navigate(`/library-game/${gameId}`);
  };

  // Function to add a new game
  const handleAddGame = (e) => {
    e.preventDefault();
    if (!newGame.title.trim() || !newGame.image.trim()) {
      setNotification("Please enter both game name and image URL!");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    const newGameData = {
      id: Date.now(),
      title: newGame.title.trim(),
      image: newGame.image.trim(),
    };
    const updatedGames = [newGameData, ...allGames];
    setAllGames(updatedGames);
    localStorage.setItem("libraryGames", JSON.stringify(updatedGames));
    setNotification(`${newGameData.title} has been added to your library!`);
    setNewGame({ title: "", image: "" });
    setShowModal(false);
    setTimeout(() => setNotification(""), 3000);
  };

  // Function to remove a game from the library
  const handleRemoveGame = (gameId) => {
    const updatedGames = allGames.filter((g) => g.id !== gameId);
    setAllGames(updatedGames);
    localStorage.setItem("libraryGames", JSON.stringify(updatedGames));

    setNotification("Game has been removed from your library!");
    setTimeout(() => setNotification(""), 3000);
  };

  // Function to sort games based on selected option
  const sortedGames = [...allGames].sort((a, b) => {
    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <Container>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Body */}
      <Body>
        <Sidebar>
          <SidebarTitle>Your Library</SidebarTitle>
          {/* Search Input */}
          <SearchInput
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Game List in Sidebar */}
          <SidebarList>
            {sortedGames
              .filter((game) =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((game) => (
                <SidebarItem key={game.id}>
                  <GameImage src={game.image} alt={game.title} />
                  <GameName onClick={() => handleGameClick(game.id)}>
                    {game.title}
                  </GameName>
                  {/* Remove Button */}
                  <button
                    style={{
                      backgroundColor: "rgb(199, 90, 246)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      transition: "background 0.3s ease",
                    }}
                    onClick={() => handleRemoveGame(game.id)}
                  >
                    Remove
                  </button>
                </SidebarItem>
              ))}
          </SidebarList>
        </Sidebar>

        <MainContent>
          {/* ControlBar: Sort & Add Game */}
          <ControlBar>
            <SortSelect
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="title-asc">Name (A-Z)</option>
              <option value="title-desc">Name (Z-A)</option>
            </SortSelect>
            <AddGameButton onClick={() => setShowModal(true)}>
              <FaPlus /> Add Game
            </AddGameButton>
          </ControlBar>

          {/* Recent Games Section */}
          <Section>
            <SectionTitle>Recent Games</SectionTitle>
            <GameGrid>
              {sortedGames.map((game) => (
                <GameCard key={game.id}>
                  <GameInfo onClick={() => handleGameClick(game.id)}>
                    <GameTitle>{game.title}</GameTitle>
                    <GameImageStyled src={game.image} alt={game.title} />
                  </GameInfo>
                </GameCard>
              ))}
            </GameGrid>
          </Section>
        </MainContent>
      </Body>

      {/* Modal to Add Game */}
      <ModalOverlay show={showModal}>
        <ModalContent>
          <ModalTitle>Add New Game</ModalTitle>
          <ModalForm onSubmit={handleAddGame}>
            <ModalInput
              type="text"
              placeholder="Game Name"
              value={newGame.title}
              onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
              required
            />
            <ModalInput
              type="text"
              placeholder="Game Image URL"
              value={newGame.image}
              onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
              required
            />
            <ModalButtons>
              <ModalButton primary type="submit">
                Add
              </ModalButton>
              <ModalButton type="button" onClick={() => setShowModal(false)}>
                Cancel
              </ModalButton>
            </ModalButtons>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default LibraryPage;
