// File: src/pages/LibraryPage.jsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaPlus } from "react-icons/fa";
import Navbar from "../../components/Navbar"; // Import Navbar component

// =============== Animation Keyframes ===============
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
  background-color: #1e1e2e; /* Nền xanh đậm */
  color: #c7d5e0;           /* Màu chữ xám nhạt */
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

// Body Container
const Body = styled.div`
  display: flex;
  flex: 1;
`;

// Sidebar
const Sidebar = styled.div`
  width: 300px;
  background: #2a2a3d;
  backdrop-filter: blur(8px);
  padding: 20px;
  border-right: 1px solid #0f2b44;
  border-radius: 0 0 8px 8px;
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
  border: 1px solidrgb(255, 255, 255);
  background-color: #0f1c2c;
  color: #c7d5e0;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color:rgb(255, 255, 255);
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
  background-color: #2a2a3d;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  border: 1px solid #0f2b44;
  box-shadow:  0 4px 15px rgba(0, 0, 0, 0.2);
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
`;

const SortSelect = styled.select`
  background-color: #0f1c2c;
  color: #c7d5e0;
  border: 1px solidrgb(255, 255, 255);
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:hover, &:focus {
    border-color:rgb(255, 255, 255);
  }
`;

const AddGameButton = styled.button`
  background-color:rgb(230, 229, 229);
  color: #1e1e2e;
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #28b54a;
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
  color: #66c0f4;
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
  border: 1px solid #66c0f4;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #aab2bd;
  }

  &:focus {
    border-color: #0366d6;
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
  background-color: ${(props) => (props.primary ? "#2ecc71" : "#c0392b")};
  color: ${(props) => (props.primary ? "#1e1e2e" : "#fff")};
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#28b54a" : "#a93226")};
  }
`;

// Notification
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745; /* màu xanh lá thông báo */
  color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [allGames, setAllGames] = useState([]);

  // State cho sắp xếp
  const [sortOption, setSortOption] = useState("title-asc");

  // State cho modal
  const [showModal, setShowModal] = useState(false);

  // State cho thông tin game mới
  const [newGame, setNewGame] = useState({
    title: "",
    image: "",
  });

  // State cho Notification
  const [notification, setNotification] = useState("");

  const marketRef = useRef(null);
  const libraryRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Đóng dropdown khi click ngoài
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

  // Lần đầu load trang
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];
    // Nếu chưa có, lưu mảng trống vào localStorage
    localStorage.setItem("libraryGames", JSON.stringify(libraryGames));

    setAllGames(libraryGames);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lọc game theo searchTerm
  const filteredGames = allGames.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp game theo tùy chọn
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const handleGameClick = (gameId) => {
    navigate(`/library-game/${gameId}`);
  };

  // Thêm game mới
  const handleAddGame = (e) => {
    e.preventDefault();
    if (!newGame.title.trim() || !newGame.image.trim()) {
      setNotification("Vui lòng nhập đầy đủ thông tin game!");
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
    setNotification(`${newGameData.title} đã được thêm vào thư viện!`);
    setNewGame({ title: "", image: "" });
    setShowModal(false);
    setTimeout(() => setNotification(""), 3000);
  };

  // Xóa game khỏi thư viện
  const handleRemoveGame = (gameId) => {
    const updatedGames = allGames.filter((g) => g.id !== gameId);
    setAllGames(updatedGames);
    localStorage.setItem("libraryGames", JSON.stringify(updatedGames));

    setNotification("Game đã được xóa khỏi thư viện!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <Container>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Body */}
      <Body>
        <Sidebar>
          <SidebarTitle>Your Library</SidebarTitle>
          {/* Tìm kiếm */}
          <SearchInput
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Danh sách game ở Sidebar */}
          <SidebarList>
            {sortedGames.map((game) => (
              <SidebarItem key={game.id}>
                <GameImage src={game.image} alt={game.title} />
                <GameName onClick={() => handleGameClick(game.id)}>
                  {game.title}
                </GameName>
                {/* Nút Remove */}
                <button
                  style={{
                    backgroundColor: "rgb(230, 229, 229)",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    cursor: "pointer",
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
          {/* ControlBar: Sắp xếp & Thêm game */}
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

      {/* Modal thêm game */}
      <ModalOverlay show={showModal}>
        <ModalContent>
          <ModalTitle>Thêm game mới</ModalTitle>
          <ModalForm onSubmit={handleAddGame}>
            <ModalInput
              type="text"
              placeholder="Tên game"
              value={newGame.title}
              onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
              required
            />
            <ModalInput
              type="text"
              placeholder="URL ảnh game"
              value={newGame.image}
              onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
              required
            />
            <ModalButtons>
              <ModalButton primary type="submit">
                Thêm
              </ModalButton>
              <ModalButton onClick={() => setShowModal(false)}>
                Hủy
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
