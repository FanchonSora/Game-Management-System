// File: src/pages/MarketCodePage.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import marketCodes from "../../data/marketCodes"; 
import Navbar from '../../components/Navbar';

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
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
const SearchBarContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px 15px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);

  &:focus {
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  }
`;

// Dropdown Search
const SearchDropdown = styled.ul`
  position: absolute;
  top: 50px;
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

// Grid
const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

// Card style
const Card = styled.div`
  background: #292e49;
  padding: 1rem;
  border-radius: 10px;
  color: #c7d5e0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
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
  color: #fff;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 0.5rem;
`;

const Tag = styled.span`
  background-color: #2ecc71;
  color: #000;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
`;

const CodePrice = styled.p`
  font-size: 0.9rem;
  color: #ff4d6d;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: auto; /* đẩy button xuống */
`;

const AddButton = styled.button`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: #5aa8e6;
  }
`;

const BuyButton = styled.button`
  background-color: #ff5722;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e64a19;
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
  transition: background 0.3s ease;

  &:hover {
    background-color: #28b54a;
  }
`;

const MarketCodePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBarRef = useRef(null);

  // Destructure
  const { featuredCodes, libraries, snippets, tools } = marketCodes;

  // Tất cả code
  const allCodes = [...featuredCodes, ...libraries, ...snippets, ...tools];

  // Lọc theo search
  const filteredCodes = allCodes.filter((code) =>
    code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Dropdown click ngoài
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

  // Thêm (chỉ khi free)
  const handleAdd = (code) => {
    if (code.price === "Free") {
      const storedCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];
      if (!storedCodes.some((c) => c.id === code.id)) {
        storedCodes.push(code);
        localStorage.setItem("libraryCodes", JSON.stringify(storedCodes));
        alert(`${code.title} đã được thêm vào thư viện!`);
      } else {
        alert(`${code.title} đã có trong thư viện.`);
      }
    } else {
      alert(`Không thể thêm ${code.title} (đoạn mã này không free).`);
    }
  };

  // Buy
  const handleBuy = (code) => {
    let storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
    if (!storedCart.some((c) => c.id === code.id && c.type === 'code')) {
      storedCart.push({ ...code, type: 'code' });
      localStorage.setItem("Cart", JSON.stringify(storedCart));
      alert(`${code.title} đã được thêm vào giỏ hàng!`);
    } else {
      alert(`${code.title} đã có trong giỏ hàng.`);
    }
  };

  // View
  const handleView = (code) => {
    navigate(`/market-code/${code.id}`);
  };

  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        
        {/* Search */}
        <SearchBarContainer ref={searchBarRef}>
          <SearchInput
            type="text"
            placeholder="Tìm kiếm đoạn mã..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
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
                  {code.title}
                </SearchDropdownItem>
              ))}
            </SearchDropdown>
          )}
        </SearchBarContainer>

        {/* Featured Codes */}
        <SectionTitle>Featured Codes</SectionTitle>
        <Subtitle>Explore our top code snippets and tools!</Subtitle>
        <Grid>
          {featuredCodes.map((code) => (
            <Card key={code.id}>
              {code.image && <CodeImage src={code.image} alt={code.title} />}
              <CodeTitle>{code.title}</CodeTitle>
              <TagContainer>
                {code.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </TagContainer>
              <CodePrice>{code.price === 0 || isNaN(parseFloat(code.price)) ? "Free" : `$${parseFloat(code.price).toFixed(2)}`}</CodePrice>
              <ButtonGroup>
                {code.price === "Free" && (
                  <AddButton onClick={() => handleAdd(code)}>Add to Library</AddButton>
                )}
                {code.price !== "Free" && (
                  <BuyButton onClick={() => handleBuy(code)}>Purchase</BuyButton>
                )}
                <ViewButton onClick={() => handleView(code)}>View</ViewButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>

        {/* Libraries */}
        <SectionTitle style={{ marginTop: "40px" }}>Libraries</SectionTitle>
        <Subtitle>Essential libraries to boost your projects</Subtitle>
        <Grid>
          {libraries.map((code) => (
            <Card key={code.id}>
              <CodeImage src={code.image} alt={code.title} />
              <CodeTitle>{code.title}</CodeTitle>
              <TagContainer>
                {code.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </TagContainer>
              <CodePrice>{code.price === 0 || isNaN(parseFloat(code.price)) ? "Free" : `$${parseFloat(code.price).toFixed(2)}`}</CodePrice>
              <ButtonGroup>
                {code.price === "Free" && (
                  <AddButton onClick={() => handleAdd(code)}>Add to Library</AddButton>
                )}
                {code.price !== "Free" && (
                  <BuyButton onClick={() => handleBuy(code)}>Purchase</BuyButton>
                )}
                <ViewButton onClick={() => handleView(code)}>View</ViewButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>

        {/* Snippets */}
        <SectionTitle style={{ marginTop: "40px" }}>Snippets</SectionTitle>
        <Subtitle>Reusable code snippets for common tasks</Subtitle>
        <Grid>
          {snippets.map((code) => (
            <Card key={code.id}>
              <CodeImage src={code.image} alt={code.title} />
              <CodeTitle>{code.title}</CodeTitle>
              <TagContainer>
                {code.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </TagContainer>
              <CodePrice>{code.price === 0 || isNaN(parseFloat(code.price)) ? "Free" : `$${parseFloat(code.price).toFixed(2)}`}</CodePrice>
              <ButtonGroup>
                {code.price === "Free" && (
                  <AddButton onClick={() => handleAdd(code)}>Add to Library</AddButton>
                )}
                {code.price !== "Free" && (
                  <BuyButton onClick={() => handleBuy(code)}>Purchase</BuyButton>
                )}
                <ViewButton onClick={() => handleView(code)}>View</ViewButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>

        {/* Tools */}
        <SectionTitle style={{ marginTop: "40px" }}>Tools</SectionTitle>
        <Subtitle>Tools to enhance your development workflow</Subtitle>
        <Grid>
          {tools.map((code) => (
            <Card key={code.id}>
              <CodeImage src={code.image} alt={code.title} />
              <CodeTitle>{code.title}</CodeTitle>
              <TagContainer>
                {code.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </TagContainer>
              <CodePrice>{code.price === 0 || isNaN(parseFloat(code.price)) ? "Free" : `$${parseFloat(code.price).toFixed(2)}`}</CodePrice>
              <ButtonGroup>
                {code.price === "Free" && (
                  <AddButton onClick={() => handleAdd(code)}>Add to Library</AddButton>
                )}
                {code.price !== "Free" && (
                  <BuyButton onClick={() => handleBuy(code)}>Add to Cart</BuyButton>
                )}
                <ViewButton onClick={() => handleView(code)}>View</ViewButton>
              </ButtonGroup>
            </Card>
          ))}
        </Grid>
      </ContentWrapper>
    </Container>
  );
};

export default MarketCodePage;
