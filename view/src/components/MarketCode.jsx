// MarketCodePage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

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

// Container with Background Gradient
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(135deg, #182b3a 0%, #0d1c2e 100%);
  color: #c7d5e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Navbar Styled Components
const Navbar = styled.nav`
  width: 100%;
  background-color: rgba(42, 71, 94, 0.8);
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 2rem;
  z-index: 1000; /* Ensure Navbar is always on top */
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
  color: #66c0f4;
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
  color: #66c0f4;
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

// Tag Styled Component
const Tag = styled.span`
  display: inline-block;
  background-color: #2ecc71;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-top: 5px;
  margin-right: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

// Carousel Styled Components
const CarouselContainer = styled.div`
  margin-bottom: 60px;
`;

const CarouselTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
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

// Featured Code Card
const FeaturedCard = styled.div`
  background-color: rgba(42,71,94,0.8);
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
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }

  /* Adjust child divs for tags */
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

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

const CodeImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
`;

const CodeTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
`;

const CodePrice = styled.p`
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

// Category Section Styled Components
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

// Body Layout
const Body = styled.div`
  display: flex;
  flex: 1;
`;

// Sidebar
const Sidebar = styled.aside`
  width: 20%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  padding: 20px;
  border-right: 1px solid #0f2b44;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
`;

const SidebarDescription = styled.p`
  font-size: 14px;
  color: #c7d5e0;
`;

// Main Content
const MainContent = styled.main`
  width: 80%;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Tag Styled Component (Repeated for clarity)
const TagStyled = Tag;

// Navbar Component
const MarketCodePage = () => {
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

  // Featured Codes Data
  const featuredCodes = [
    { 
      id: 1, 
      title: 'React Router v6', 
      price: 'Free', 
      image: '/code/react-router.jpg', 
      tags: ['JavaScript', 'React'] 
    },
    { 
      id: 2, 
      title: 'Styled Components', 
      price: 'Free', 
      image: '/code/styled-components.jpg', 
      tags: ['JavaScript', 'CSS'] 
    },
    { 
      id: 3, 
      title: 'Redux Toolkit', 
      price: 'Free', 
      image: '/code/redux-toolkit.jpg', 
      tags: ['JavaScript', 'React'] 
    },
    { 
      id: 4, 
      title: 'Next.js 13', 
      price: 'Free', 
      image: '/code/nextjs.jpg', 
      tags: ['JavaScript', 'React', 'TypeScript'] 
    },
    { 
      id: 5, 
      title: 'TypeScript Basics', 
      price: 'Free', 
      image: '/code/typescript.jpg', 
      tags: ['TypeScript'] 
    },
    { 
      id: 6, 
      title: 'GraphQL Essentials', 
      price: 'Free', 
      image: '/code/graphql.jpg', 
      tags: ['JavaScript', 'GraphQL'] 
    },
  ];

  // Categorized Codes Data
  const libraries = [
    { 
      id: 7, 
      title: 'Lodash', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/lodash.jpg', 
      tags: ['JavaScript'] 
    },
    { 
      id: 8, 
      title: 'Axios', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/axios.jpg', 
      tags: ['JavaScript'] 
    },
    { 
      id: 9, 
      title: 'Moment.js', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/moment.jpg', 
      tags: ['JavaScript'] 
    },
    { 
      id: 10, 
      title: 'D3.js', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/d3.jpg', 
      tags: ['JavaScript'] 
    },
  ];

  const snippets = [
    { 
      id: 11, 
      title: 'Debounce Function', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/debounce.jpg', 
      tags: ['JavaScript'] 
    },
    { 
      id: 12, 
      title: 'Throttling Technique', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/throttle.jpg', 
      tags: ['JavaScript'] 
    },
    { 
      id: 13, 
      title: 'Responsive Grid', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/grid.jpg', 
      tags: ['CSS', 'HTML'] 
    },
    { 
      id: 14, 
      title: 'API Request Handler', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/api-handler.jpg', 
      tags: ['JavaScript'] 
    },
  ];

  const tools = [
    { 
      id: 15, 
      title: 'Webpack Configuration', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/webpack.jpg', 
      tags: ['JavaScript', 'Webpack'] 
    },
    { 
      id: 16, 
      title: 'Babel Setup', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/babel.jpg', 
      tags: ['JavaScript', 'Babel'] 
    },
    { 
      id: 17, 
      title: 'ESLint Rules', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/eslint.jpg', 
      tags: ['JavaScript', 'ESLint'] 
    },
    { 
      id: 18, 
      title: 'Prettier Formatting', 
      price: 'Free', 
      discount: '-100%', 
      image: '/code/prettier.jpg', 
      tags: ['JavaScript', 'Prettier'] 
    },
  ];

  // Function to handle adding free codes to library
  const handleAdd = (code) => {
    if (code.price === 'Free') {
      const storedCodes = JSON.parse(localStorage.getItem('libraryCodes')) || [];
      // Add the new code if not already present
      if (!storedCodes.find((c) => c.id === code.id)) {
        storedCodes.push({ id: code.id, name: code.title });
        localStorage.setItem('libraryCodes', JSON.stringify(storedCodes));
        alert(`${code.title} has been added to your Library!`);
      } else {
        alert(`${code.title} is already in your Library.`);
      }
    } else {
      alert(`Cannot add ${code.title} to your Library. This code is not free.`);
    }
  };

  // Function to handle viewing code details
  const handleView = (code) => {
    navigate(`/market-code/${code.id}`);
  };

  // Function to chunk array into smaller arrays
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Prepare slides for carousel (3 codes per slide)
  const slides = chunkArray(featuredCodes, 3);
  const totalSlides = slides.length;

  // useEffect to handle auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Function to render code cards for categories
  const renderCodeCards = (codes) => {
    return codes.map((code) => (
      <FeaturedCard key={code.id}>
        {code.discount && <DiscountBadge>{code.discount}</DiscountBadge>}
        <CodeImage src={code.image} alt={code.title} />
        <CodeTitle>{code.title}</CodeTitle>
        
        {/* Tags Section */}
        <div>
          {code.tags && code.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
        
        <CodePrice>{code.price === 'Free' ? 'Free' : code.price}</CodePrice>
        <ButtonGroup>
          {code.price === 'Free' && (
            <FreeButton onClick={() => handleAdd(code)}>ADD</FreeButton>
          )}
          <ViewButton onClick={() => handleView(code)}>VIEW</ViewButton>
        </ButtonGroup>
      </FeaturedCard>
    ));
  };

  // Function to render featured codes carousel
  const renderFeaturedCodesCarousel = () => {
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
              {slide.map((code) => (
                <FeaturedCard key={code.id}>
                  {code.discount && <DiscountBadge>{code.discount}</DiscountBadge>}
                  <CodeImage src={code.image} alt={code.title} />
                  <CodeTitle>{code.title}</CodeTitle>
                  
                  {/* Tags Section */}
                  <div>
                    {code.tags && code.tags.map((tag, idx) => (
                      <Tag key={idx}>{tag}</Tag>
                    ))}
                  </div>
                  
                  <CodePrice>{code.price === 'Free' ? 'Free' : code.price}</CodePrice>
                  <ButtonGroup>
                    {code.price === 'Free' && (
                      <FreeButton onClick={() => handleAdd(code)}>ADD</FreeButton>
                    )}
                    <ViewButton onClick={() => handleView(code)}>VIEW</ViewButton>
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

      {/* Featured Codes Carousel */}
      <CarouselContainer>
        <CarouselTitle>Featured Codes</CarouselTitle>
        <CarouselSubtitle>Explore our top code snippets and tools!</CarouselSubtitle>
        {renderFeaturedCodesCarousel()}
      </CarouselContainer>

      {/* Libraries Section */}
      <CategorySection>
        <SectionTitle>Libraries</SectionTitle>
        <Subtitle>Essential libraries to boost your projects</Subtitle>
        <Grid>
          {renderCodeCards(libraries)}
        </Grid>
      </CategorySection>

      {/* Snippets Section */}
      <CategorySection>
        <SectionTitle>Snippets</SectionTitle>
        <Subtitle>Reusable code snippets for common tasks</Subtitle>
        <Grid>
          {renderCodeCards(snippets)}
        </Grid>
      </CategorySection>

      {/* Tools Section */}
      <CategorySection>
        <SectionTitle>Tools</SectionTitle>
        <Subtitle>Tools to enhance your development workflow</Subtitle>
        <Grid>
          {renderCodeCards(tools)}
        </Grid>
      </CategorySection>
    </Container>
  );
};

// Export the component
export default MarketCodePage;
