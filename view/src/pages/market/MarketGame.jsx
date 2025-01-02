// File: src/pages/MarketGamePage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import gameData from '../../data/gameData'; // data game
import Navbar from '../../components/Navbar';

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #1e1e2e;
  min-height: 100vh;
  padding: 20px;
  color: #c7d5e0;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Thanh tìm kiếm
const SearchBarContainer = styled.div`
  margin-bottom: 30px;
  position: relative; /* để đặt dropdown */
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);

  &::placeholder {
    color: #aaa;
  }
`;

// Dropdown Search
const SearchDropdown = styled.ul`
  position: absolute;
  top: 50px; /* ngay dưới SearchInput */
  width: 100%;
  max-width: 500px;
  background-color: #292e49;
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  max-height: 250px;
  overflow-y: auto;
  z-index: 999;
`;

const SearchDropdownItem = styled.li`
  padding: 0.5rem;
  color: #c7d5e0;
  border-bottom: 1px solid #3e3e5a;
  cursor: pointer;
  &:hover {
    background-color: #3b4162;
  }
  &:last-child {
    border-bottom: none;
  }
`;

// Grid hiển thị game
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

// Card (theo style Home Page)
const Card = styled.div`
  background: #292e49;
  padding: 1rem;
  border-radius: 12px;
  color: #c7d5e0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const GameTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
  color: #ffffff;
`;

const GamePrice = styled.p`
  font-size: 0.9rem;
  color: #ff4d6d;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #5aa8e6;
    transform: translateY(-2px);
  }
`;

const ViewButton = styled.button`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #28b54a;
    transform: translateY(-2px);
  }
`;

const MarketGamePage = () => {
  const navigate = useNavigate();

  // State search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Ref để đóng dropdown khi click ngoài
  const searchBarRef = useRef(null);

  // Lọc game theo search query
  const filteredGames = gameData.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bên dưới tuỳ ý chia category "Featured", "Action", ... tuỳ logic
  // Ở đây ta chỉ demo "Featured" + "All Games" 
  const featuredGames = gameData.filter((game) =>
    game.tags.includes("Featured")
  );

  // Thêm game free vào library
  const handleAddToLibrary = (game) => {
    if (game.price === 'Free') {
      let libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];
      if (!libraryGames.some(g => g.id === game.id)) {
        libraryGames.push(game);
        localStorage.setItem("libraryGames", JSON.stringify(libraryGames));
        alert(`${game.title} đã được thêm vào thư viện!`);
      } else {
        alert(`${game.title} đã có trong thư viện.`);
      }
    } else {
      alert(`Không thể thêm ${game.title} (không phải Free).`);
    }
  };

  // Xem chi tiết
  const handleViewDetails = (game) => {
    navigate(`/market-game/${game.id}`);
  };

  // Đóng dropdown nếu click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchBarRef.current && 
        !searchBarRef.current.contains(e.target)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        {/* Search */}
        <SearchBarContainer ref={searchBarRef}>
          <SearchInput
            type="text"
            placeholder="Search game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          {isSearchFocused && searchQuery.trim().length > 0 && filteredGames.length > 0 && (
            <SearchDropdown>
              {filteredGames.slice(0, 8).map((game) => (
                <SearchDropdownItem
                  key={game.id}
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                    navigate(`/market-game/${game.id}`);
                  }}
                >
                  {game.title}
                </SearchDropdownItem>
              ))}
            </SearchDropdown>
          )}
        </SearchBarContainer>

        {/* Featured Games */}
        <SectionTitle>Featured Games</SectionTitle>
        <Subtitle>Don't miss out on our top picks!</Subtitle>
        <Grid>
          {featuredGames.map((game) => (
            <Card key={game.id}>
              <GameImage src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
              <GamePrice>{game.price === 0 || isNaN(parseFloat(game.price)) ? "Free" : `$${parseFloat(game.price).toFixed(2)}`}</GamePrice>
              <ButtonGroup>
                {game.price === 'Free' && (
                  <ActionButton onClick={() => handleAddToLibrary(game)}>
                    Add to Library
                  </ActionButton>
                )}
                <ViewButton onClick={() => handleViewDetails(game)}>
                  View
                </ViewButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>

        {/* Tất cả game (hoặc chia category) */}
        <SectionTitle style={{ marginTop: "40px" }}>All Games</SectionTitle>
        <Subtitle>Browse the collection</Subtitle>
        <Grid>
          {gameData.map((game) => (
            <Card key={game.id}>
              <GameImage src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
              <GamePrice>{game.price === 0 || isNaN(parseFloat(game.price)) ? "Free" : `$${parseFloat(game.price).toFixed(2)}`}</GamePrice>
              <ButtonGroup>
                {game.price === 'Free' && (
                  <ActionButton onClick={() => handleAddToLibrary(game)}>
                    Add
                  </ActionButton>
                )}
                <ViewButton onClick={() => handleViewDetails(game)}>
                  Details
                </ViewButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>
      </ContentWrapper>
    </Container>
  );
};

export default MarketGamePage;
