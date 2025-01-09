import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import marketCodes from "../../data/marketCodes"; // data code
import Navbar from "../../components/Navbar";
import { FaSearch, FaTags } from "react-icons/fa"; // Import thêm icon

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ===== Styled Components =====

// Layout
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

// Featured
const FeaturedCodeSection = styled.section`
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

const FeaturedImage = styled.img`
  width: 45%;
  max-width: 350px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    width: 60%;
    margin-top: 2rem;
  }
`;

// Search + Tag Filter
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1500px;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
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

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 40px; /* chừa chỗ cho icon Search */
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: #2a2a3d;
  color: #c7d5e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
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

const DropdownItemImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
`;

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

// Code Grid
const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
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

const CodeImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const CodeTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
  color: #ffffff;
`;

const CodePrice = styled.p`
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

// ===== Main Component =====
const MarketCodePage = () => {
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);

  // Toggle hiển thị Tag Filter
  const [showTagsFilter, setShowTagsFilter] = useState(false);
  // State để nhớ tag đang được chọn
  const [tagFilter, setTagFilter] = useState(null);

  const searchBarRef = useRef(null);

  // Lấy data
  const { featuredCodes } = marketCodes;

  // Lấy tất cả tag (unique)
  const allTags = [...new Set(featuredCodes.flatMap((code) => code.tags))];

  // Xử lý auto-slide cho featured code
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeIndex((prevIndex) => (prevIndex + 1) % featuredCodes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredCodes.length]);

  // Lọc code theo searchQuery & tagFilter
  const filteredCodes = featuredCodes.filter((code) => {
    const matchesQuery =
      code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesTag = tagFilter ? code.tags.includes(tagFilter) : true;
    return matchesQuery && matchesTag;
  });

  // Thêm vào library
  const handleAddToLibrary = (code) => {
    const libraryCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];
    if (!libraryCodes.some((c) => c.id === code.id)) {
      libraryCodes.push(code);
      localStorage.setItem("libraryCodes", JSON.stringify(libraryCodes));
      alert(`${code.title} has been added to your library!`);
    } else {
      alert(`${code.title} is already in your library.`);
    }
  };

  // View details
  const handleViewDetails = (code) => {
    navigate(`/market-code/${code.id}`);
  };

  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        {/* ===== Featured Codes Section ===== */}
        {featuredCodes.length > 0 && (
          <FeaturedCodeSection>
            <FeaturedContent>
              <FeaturedTitle>
                {featuredCodes[currentCodeIndex]?.title || "Featured Code"}
              </FeaturedTitle>
              <FeaturedSubtitle>
                {featuredCodes[currentCodeIndex]?.description ||
                  "Check out this amazing code snippet!"}
              </FeaturedSubtitle>
            </FeaturedContent>
            <FeaturedImage
              src={featuredCodes[currentCodeIndex]?.image || "placeholder.jpg"}
              alt="Featured Code"
            />
          </FeaturedCodeSection>
        )}

        {/* ===== Search + Tag Filter ===== */}
        <SearchBarWrapper>
          {/* Search Bar */}
          <SearchBarContainer ref={searchBarRef}>
            <SearchIconWrapper>
              <FaSearch size={20} />
            </SearchIconWrapper>
            <SearchInput
              type="search"
              placeholder={isPlaceholderVisible ? "search..." : ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsPlaceholderVisible(false);
                setIsSearchFocused(true);
              }}
              onBlur={() => setIsPlaceholderVisible(true)}
            />
            {/* Search Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && filteredCodes.length > 0 && (
              <SearchDropdown>
                {filteredCodes.slice(0, 8).map((code) => (
                  <SearchDropdownItem
                    key={code.id}
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                      navigate(`/market-code/${code.id}`);
                    }}
                  >
                    <DropdownItemImage src={code.image || "placeholder.jpg"} alt={code.title} />
                    {code.title}
                  </SearchDropdownItem>
                ))}
              </SearchDropdown>
            )}
          </SearchBarContainer>

          {/* Icon mở/đóng tag filter */}
          <TagFilterIconWrapper onClick={() => setShowTagsFilter(!showTagsFilter)}>
            <FaTags />
          </TagFilterIconWrapper>

          {/* Tag Filter Container */}
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

        {/* ===== All Codes Section ===== */}
        <SectionTitle>All Codes</SectionTitle>
        <Grid>
          {filteredCodes.map((code) => (
            <Card key={code.id}>
              <CodeImage src={code.image} alt={code.title} />
              <CodeTitle>{code.title}</CodeTitle>
              <CodePrice>
                {code.price === 0 || isNaN(parseFloat(code.price))
                  ? "Free"
                  : `$${parseFloat(code.price).toFixed(2)}`}
              </CodePrice>
              <ButtonGroup>
                {code.price === "Free" && (
                  <ActionButton onClick={() => handleAddToLibrary(code)}>
                    Add
                  </ActionButton>
                )}
                <ActionButton onClick={() => handleViewDetails(code)}>
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

export default MarketCodePage;
