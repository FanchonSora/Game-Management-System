import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// HeartIcon Component (Optional, not used in current code)
const HeartIcon = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#ff4d6d" : "none"}
    stroke={filled ? "#ff4d6d" : "#666"}
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// Keyframes for Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Styled Components

// Container with Background Image and Overlay
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
    background: rgba(0, 0, 0, 0.6); /* Overlay */
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

// Navbar Styled Components
const Navbar = styled.nav`
  width: 100%;
  background-color:  rgba(42, 71, 94, 0.8);
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow:  0 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 2rem;
  z-index: 1000; /* Đảm bảo Navbar luôn ở trên cùng */
  position: relative;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
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

const DropdownItem = styled.a`
  display: block;
  padding: 10px 15px;
  color: #c7d5e0;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NavLinkStyled = styled.a`
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

// Categories Section
const CategorySection = styled.div`
  margin-bottom: 60px;
`;

// Section Title
const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

// Subtitle
const Subtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

// Grid for Games
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

// Featured Games Carousel Container
const CarouselContainer = styled.div`
  margin-bottom: 60px;
`;

// Carousel Title
const CarouselTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

// Carousel Subtitle
const CarouselSubtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 30px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

// Carousel Wrapper
const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
`;

// Slides Container
const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

// Individual Slide
const Slide = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  animation: ${slideIn} 0.5s ease-in-out;
`;

// Featured Game Card
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

// Discount Badge
const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #2ecc71;
  color: #fff;
  padding: 5px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
`;

// Game Image
const GameImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
`;

// Game Title
const GameTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
`;

// Game Price
const GamePrice = styled.p`
  font-size: 16px;
  color: #ff4d6d;
  margin-bottom: 10px;
  font-weight: bold;
`;

// Button Group
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

// Styled Buttons
const FreeButton = styled.button`
  background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(102, 192, 244, 0.5);

  &:hover {
    background-color: #5aa8e6;
  }
`;

const ViewButton = styled.button`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(46, 204, 113, 0.5);

  &:hover {
    background-color: #28b54a;
  }
`;

// Styled Game Card
const GameCard = styled.div`
  background-color: rgba(42,71,94,0.8);
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #0f2b44;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }
`;

const FeaturedGameImage = styled(GameImage)`
  height: 180px;
`;

// Navbar Component (Integrated into FeaturedMarketGamePage)
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

  // Featured Games Data
  const featuredGames = [
    { id: 9, title: 'Lord of the Rings: Return to Moria', price: '321.000đ', image: '/game/Lord of the Rings.jpg' },
    { id: 10, title: 'Ready or Not', price: '399.000đ', image: '/game/Ready or Not.jpg' },
    { id: 11, title: 'Dead by Daylight', price: '340.000đ', image: '/game/Dead by Daylight.jpg' },
    { id: 12, title: 'WWE 2K24', price: '1.000.000đ', image: '/game/WWE 2K24.jpg' },
    { id: 13, title: 'Stellaris', price: '664.000đ', image: '/game/Stellaris.jpg', isLive: true },
    { id: 18, title: 'Crab Game', price: 'Free', image: '/game/Crab Game.jpg' },
  ];

  // Categorized Games Data
  const massivelyMultiplayerGames = [
    { id: 1, title: 'Foxhole', price: '155.000đ', discount: '-38%', image: '/game/Foxhole.jpg' },
    { id: 2, title: 'Hell Let Loose', price: '591.500đ', discount: '-50%', image: '/game/Hell Let Loose.jpg' },
    { id: 3, title: 'SCUM', price: '282.500đ', discount: '-50%', image: '/game/SCUM.jpg' },
    { id: 4, title: 'Test Drive Unlimited', price: '469.000đ', discount: '-30%', image: '/game/Test Drive Unlimited.jpg' },
    { id: 14, title: 'War Thunder', price: 'Free', discount: '-100%', image: '/game/War Thunder.jpg' },
    { id: 15, title: 'Albion Online', price: 'Free', discount: '-100%', image: '/game/Albion Online.jpg' },
  ];

  const casualGames = [
    { id: 5, title: 'Goat Simulator 3', price: '127.000đ', discount: '-67%', image: '/game/Goat Simulator 3.jpg' },
    { id: 6, title: 'Luma Island', price: '160.000đ', discount: '-20%', image: '/game/Luma Island.jpg' },
    { id: 7, title: 'F1 24', price: '436.000đ', discount: '-60%', image: '/game/F1 24.jpg' },
    { id: 8, title: 'Dreamlight Valley', price: '667.500đ', discount: '-25%', image: '/game/Dreamlight Valley.jpg' },
    { id: 16, title: 'Candy Crush Saga', price: 'Free', discount: '-100%', image: '/game/Candy Crush Saga.jpg' },
    { id: 17, title: 'Among Us', price: 'Free', discount: '-100%', image: '/game/Among Us.jpg' },
  ];

  // Function to handle adding free games to library
  const handleFree = (game) => {
    if (game.price === 'Free') {
      const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
      // Add the new game if not already present
      if (!storedGames.find((g) => g.id === game.id)) {
        storedGames.push({ id: game.id, name: game.title });
        localStorage.setItem('libraryGames', JSON.stringify(storedGames));
        alert(`${game.title} has been added to your Library!`);
      } else {
        alert(`${game.title} is already in your Library.`);
      }
    } else {
      alert(`Cannot add ${game.title} to your Library. This game is not free.`);
    }
  };

  // Function to handle viewing game details
  const handleView = (game) => {
    navigate(`/game/${game.id}`);
  };

  // Function to chunk array into smaller arrays
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  
  // Prepare slides for carousel (3 games per slide)
  const slides = chunkArray(featuredGames, 3);
  const totalSlides = slides.length;

  // useEffect to handle auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Function to render game cards for categories
  const renderGameCards = (games) => {
    return games.map((game) => (
      <GameCard key={game.id}>
        {game.discount && <DiscountBadge>{game.discount}</DiscountBadge>}
        <GameImage src={game.image} alt={game.title} />
        <GameTitle>{game.title}</GameTitle>
        <GamePrice>{game.price === 'Free' ? 'Free' : game.price}</GamePrice>
        <ButtonGroup>
          {game.price === 'Free' && (
            <FreeButton onClick={() => handleFree(game)}>ADD</FreeButton>
          )}
          <ViewButton onClick={() => handleView(game)}>VIEW</ViewButton>
        </ButtonGroup>
      </GameCard>
    ));
  };

  // Function to render featured games carousel
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
                  <FeaturedGameImage src={game.image} alt={game.title} />
                  <GameTitle>{game.title}</GameTitle>
                  <GamePrice>{game.price === 'Free' ? 'Free' : game.price}</GamePrice>
                  <ButtonGroup>
                    {game.price === 'Free' && (
                      <FreeButton onClick={() => handleFree(game)}>ADD</FreeButton>
                    )}
                    <ViewButton onClick={() => handleView(game)}>VIEW</ViewButton>
                  </ButtonGroup>
                </FeaturedCard>
              ))}
            </Slide>
          ))}
        </SlidesContainer>
      </CarouselWrapper>
    );
  };

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <NavLinkStyled href="/community">Community</NavLinkStyled>

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
                <DropdownItem href="/home">Home</DropdownItem>
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

      {/* Featured Games Carousel */}
      <CarouselContainer>
        <CarouselTitle>Featured Games</CarouselTitle>
        <CarouselSubtitle>Don't miss out on our top picks!</CarouselSubtitle>
        {renderFeaturedGamesCarousel()}
      </CarouselContainer>

      {/* Massively Multiplayer Games Section */}
      <CategorySection>
        <SectionTitle>Massively Multiplayer</SectionTitle>
        <Subtitle>Recommended tag based on what you play</Subtitle>
        <Grid>
          {renderGameCards(massivelyMultiplayerGames)}
        </Grid>
      </CategorySection>

      {/* Casual Games Section */}
      <CategorySection>
        <SectionTitle>Casual</SectionTitle>
        <Subtitle>Recommended tag based on what you play</Subtitle>
        <Grid>
          {renderGameCards(casualGames)}
        </Grid>
      </CategorySection>
    </Container>
  );
};

// Export the component
export default FeaturedMarketGamePage;
