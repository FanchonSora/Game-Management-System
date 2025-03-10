import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import gameData from "../../data/gameData"; // data game
import Navbar from "../../components/Navbar";
import { FaSearch, FaTags } from "react-icons/fa"; // Nhớ import thêm FaTags

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e;
  min-height: 100vh;
  padding: 20px;
  color: #c7d5e0;
  position: relative;
  overflow: hidden;

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

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Search
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Chuyển thành flex-start, tuỳ chỉnh theo ý muốn */
  width: 100%;
  max-width: 1500px;
  margin-right: 2rem;
  gap: 1rem; /* Tạo khoảng trống giữa các phần tử trong SearchBarWrapper */
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Adjust the width of the search bar */
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 40px; /* Added left padding for the icon */
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: #2a2a3d;
  color: #c7d5e0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  }
`;

const SearchDropdown = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: #2a2a3d; 
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-height: 250px;
  overflow-y: auto;
  z-index: 999;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchDropdownItem = styled.li`
  padding: 0.5rem;
  color: #c7d5e0;
  border-bottom: 1px solid #3e3e5a;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgb(148, 64, 133);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const GameImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
`;

/* Thêm styled-component cho icon tags (nếu muốn style riêng) */
const TagFilterIconWrapper = styled.div`
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2a2a3d;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);

  &:hover {
    background-color: rgb(148, 64, 133);
  }
`;

/* Sửa lại để nhận prop show (nếu muốn toggle bằng CSS) */
const TagsFilterContainer = styled.div`
  background-color: #2a2a3d;
  border-radius: 25px;
  padding: 5px 10px;
  display: ${({ show }) => (show ? "flex" : "none")}; /* Toggle hiển thị */
  flex-wrap: wrap;
  gap: 5px;
  max-width: 500px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  /* Có thể thêm margin cho đẹp */
  margin-left: 1rem;
`;

const TagButton = styled.button`
  background-color: #2a2a3d;
  border: 1px solid #3e3e5a;
  color: #c7d5e0;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(148, 64, 133);
  }

  &.active {
    background-color: rgb(199, 90, 246);
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const FeaturedSection = styled.section`
  background: #2a2a3d;
  border-radius: 16px;
  padding: 3rem;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  animation: ${fadeIn} 1s ease-out;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FeaturedImage = styled.img`
  width: 45%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    width: 60%;
    margin-top: 2rem;
  }
`;

const FeaturedContent = styled.div`
  width: 50%;
  min-width: 300px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeaturedTitle = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 1s ease-out;
`;

const FeaturedSubtitle = styled.p`
  color: #dddddd;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Card = styled.div`
  background: #2a2a3d;
  padding: 1rem;
  border-radius: 12px;
  color: #c7d5e0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const GameImageCard = styled.img`
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
  background-color: rgb(199, 90, 246);
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const MarketGamePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null); // New state for tag filter
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBarRef = useRef(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  // Thêm state để toggle hiển thị TagsFilterContainer
  const [showTagsFilter, setShowTagsFilter] = useState(false);

  const featuredGames = gameData.filter((game) => game.tags.includes("Featured"));

  const allTags = [...new Set(gameData.flatMap((game) => game.tags))]; // Get all unique tags

  // Filter games by search query and selected tag
  const filteredGames = gameData.filter((game) => {
    const matchesQuery =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = tagFilter ? game.tags.includes(tagFilter) : true;

    return matchesQuery && matchesTag;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredGames.length]);

  const handleAddToLibrary = (game) => {
    const libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];
    if (!libraryGames.some((g) => g.id === game.id)) {
      libraryGames.push(game);
      localStorage.setItem("libraryGames", JSON.stringify(libraryGames));
      alert(`${game.title} has been added to your library!`);
    } else {
      alert(`${game.title} is already in your library.`);
    }
  };

  const handleViewDetails = (game) => {
    navigate(`/market-game/${game.id}`);
  };

  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        {/* Featured Games Section */}
        {featuredGames.length > 0 && (
          <FeaturedSection>
            <FeaturedContent>
              <FeaturedTitle>
                {featuredGames[currentGameIndex]?.title || "Featured Game"}
              </FeaturedTitle>
              <FeaturedSubtitle>
                {featuredGames[currentGameIndex]?.description ||
                  "Don't miss out on this amazing game!"}
              </FeaturedSubtitle>
            </FeaturedContent>
            <FeaturedImage
              src={featuredGames[currentGameIndex]?.image || "placeholder.jpg"}
              alt="Featured Game"
            />
          </FeaturedSection>
        )}

        {/* Search + Icon + Tag Filter */}
        <SearchBarWrapper>
          {/* Search Bar */}
          <SearchBarContainer ref={searchBarRef}>
            <SearchIconWrapper>
              <FaSearch size={20} />
            </SearchIconWrapper>
            <SearchInput
              type="search..."
              placeholder={isPlaceholderVisible ? "search..." : ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsPlaceholderVisible(false);
                setIsSearchFocused(true);
              }}
              onBlur={() => setIsPlaceholderVisible(true)}
            />
            {isSearchFocused && searchQuery.trim().length > 0 && filteredGames.length > 0 && (
              <SearchDropdown>
                {filteredGames.slice(0, 8).map((game) => (
                  <SearchDropdownItem
                    key={game.id}
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                      navigate(`/market-game/${game.id}`);
                    }}
                  >
                    <GameImage src={game.image} alt={game.title} />
                    {game.title}
                  </SearchDropdownItem>
                ))}
              </SearchDropdown>
            )}
          </SearchBarContainer>

          {/* Icon để mở/tắt Tag Filter */}
          <TagFilterIconWrapper onClick={() => setShowTagsFilter(!showTagsFilter)}>
            <FaTags />
          </TagFilterIconWrapper>

          {/* Tags filter container có show/ẩn */}
          <TagsFilterContainer show={showTagsFilter}>
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                className={tag === tagFilter ? "active" : ""}
                onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
              >
                {tag}
              </TagButton>
            ))}
          </TagsFilterContainer>
        </SearchBarWrapper>

        {/* All Games Section */}
        <SectionTitle>All Games</SectionTitle>
        <Grid>
          {filteredGames.map((game) => (
            <Card key={game.id}>
              <GameImageCard src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
              <GamePrice>
                {game.price === 0 || isNaN(parseFloat(game.price))
                  ? "Free"
                  : `$${parseFloat(game.price).toFixed(2)}`}
              </GamePrice>
              <ButtonGroup>
                {game.price === "Free" && (
                  <ActionButton onClick={() => handleAddToLibrary(game)}>
                    Add
                  </ActionButton>
                )}
                <ActionButton onClick={() => handleViewDetails(game)}>
                  Details
                </ActionButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>
      </ContentWrapper>
    </Container>
  );
};

export default MarketGamePage;
