import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import gameData from '../../data/gameData';
import Card from '../../components/GameCard';

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`; 

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// Styled Components

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-image: url('/images/img2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

const Navbar = styled.nav`
  width: 100%;
  background-color: rgba(42, 71, 94, 0.8);
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 2rem;
  z-index: 1000;
  position: relative;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

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

// Tag Filter
const TagFilterContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const TagButtonStyled = styled.button`
  background-color: ${({ active }) => (active ? '#66c0f4' : 'rgba(102, 192, 244, 0.3)')};
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #66c0f4;
  }
`;

const CategorySection = styled.div`
  margin-bottom: 60px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

// Carousel
const CarouselContainer = styled.div`
  margin-bottom: 60px;
`;

const CarouselTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const CarouselSubtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 30px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
`;

const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const FeaturedCard = styled.div`
  background-color: rgba(42, 71, 94, 0.8);
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  position: relative;
  border: 1px solid #0f2b44;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  flex: 1;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
`;

const GameImageStyled = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
`;

const GameTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
`;

const GamePrice = styled.p`
  font-size: 16px;
  color: #ff4d6d;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

// Smaller Add Button
const FreeButton = styled.button`
  background: linear-gradient(45deg, #66c0f4, #5aa8e6);
  border: none;
  border-radius: 5px;
  color: #fff;
  /* Smaller */
  padding: 7px 7px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(86, 168, 230, 0.4);
  }
`;

// Smaller View Button
const ViewButtonStyled = styled(Link)`
  background: linear-gradient(45deg, #2ecc71, #28b54a);
  border: none;
  border-radius: 5px;
  color: #000;
  /* Smaller */
  padding: 7px 7px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 181, 74, 0.4);
  }
`;

// TagFilter
const TagFilterComponent = ({ tags, selectedTags, toggleTag }) => {
  return (
    <TagFilterContainer>
      {tags.map((tag) => (
        <TagButtonStyled
          key={tag}
          active={selectedTags.includes(tag)}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </TagButtonStyled>
      ))}
    </TagFilterContainer>
  );
};

const FeaturedMarketGamePage = () => {
  const navigate = useNavigate();

  // State for Carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // State for Dropdowns
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Refs for Dropdowns
  const marketRef = useRef(null);
  const libraryRef = useRef(null);
  const profileRef = useRef(null);

  // Tag Filtering
  const [selectedTags, setSelectedTags] = useState([]);

  // All unique tags
  const allTags = Array.from(
    new Set(gameData.flatMap((game) => game.tags))
  ).sort();

  // Toggle Tag
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filtered games by tags
  const filteredMarketGames = selectedTags.length
    ? gameData.filter((game) =>
        selectedTags.every((tag) => game.tags.includes(tag))
      )
    : gameData;

  // Categorize
  const categorizeGames = (games) => {
    const categories = {};
    games.forEach((game) => {
      game.tags.forEach((tag) => {
        if (!categories[tag]) categories[tag] = [];
        categories[tag].push(game);
      });
    });
    return categories;
  };

  const categorizedGames = categorizeGames(filteredMarketGames);

  // Slides for carousel
  const slides = chunkArray(
    gameData.filter((game) => game.tags.includes("Featured")),5
  );
  const totalSlides = slides.length;

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Add to library if free
  const handleFree = (game) => {
    if (game.price === 'Free') {
      const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
      // Thêm trò chơi mới nếu chưa có
      if (!storedGames.find((g) => g.id === game.id)) {
        storedGames.push({ id: game.id, name: game.title });
        localStorage.setItem('libraryGames', JSON.stringify(storedGames));
        logActivity('add', game); // Ghi lại hoạt động thêm
        alert(`${game.title} đã được thêm vào Thư viện của bạn!`);
      } else {
        alert(`${game.title} đã có trong Thư viện của bạn.`);
      }
    } else {
      alert(`Không thể thêm ${game.title} vào Thư viện. Trò chơi này không miễn phí.`);
    }
  };
  
  // View detail
  const handleView = (game) => {
    navigate(`/market-game/${game.id}`);
  };
  
  // chunkArray helper
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  // Render game cards in categories
  const renderGameCards = (games) => {
    return games.map((game) => (
      <Card
        key={game.id}
        image={game.image}
        title={game.title}
        description={`Price: ${game.price} ${game.discount ? `(${game.discount})` : ""}`}
        tags={game.tags}
        buttonText="View Detail"
        buttonLink={`/market-game/${game.id}`}
        isFree={game.price === 'Free'}
        onAddToLibrary={() => handleFree(game)}
        onView={() => handleView(game)} // Thêm prop onView
        maxWidth="250px"
        height="auto"
      />
    ));
  };
  
  // Render featured carousel
  const renderFeaturedGamesCarousel = () => {
    return (
      <CarouselWrapper>
        <SlidesContainer
          style={{
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide key={index}>
              {slide.map((game) => (
                <FeaturedCard key={game.id}>
                  {game.discount && <DiscountBadge>{game.discount}</DiscountBadge>}
                  <GameImageStyled src={game.image} alt={game.title} />
                  <GameTitle>{game.title}</GameTitle>
                  <GamePrice>
                    {game.price === 'Free' ? 'Free' : game.price}
                  </GamePrice>
                  <ButtonGroup>
                    {game.price === 'Free' && (
                      <FreeButton onClick={() => handleFree(game)}>
                        Add to Library
                      </FreeButton>
                    )}
                    <ViewButtonStyled to={`/market-game/${game.id}`}>
                      View Details
                    </ViewButtonStyled>
                  </ButtonGroup>
                </FeaturedCard>
              ))}
            </Slide>
          ))}
        </SlidesContainer>
      </CarouselWrapper>
    );
  };

  // Close dropdown on outside click
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container>
      <ContentWrapper>
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
                aria-haspopup="true"
                aria-expanded={isLibraryDropdownOpen}
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
                aria-haspopup="true"
                aria-expanded={isProfileDropdownOpen}
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

        {/* Featured Games Carousel */}
        <CarouselContainer>
          <CarouselTitle>Featured Games</CarouselTitle>
          <CarouselSubtitle>Don't miss out on our top picks!</CarouselSubtitle>
          {renderFeaturedGamesCarousel()}
        </CarouselContainer>

        {/* Tag Filters */}
        <TagFilterComponent
          tags={allTags}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />

        {/* Dynamically Rendered Categories */}
        {Object.keys(categorizedGames).map((category) => (
          <CategorySection key={category}>
            <SectionTitle>{category}</SectionTitle>
            <Subtitle>Recommended based on your interests</Subtitle>
            <Grid>{renderGameCards(categorizedGames[category])}</Grid>
          </CategorySection>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default FeaturedMarketGamePage;
