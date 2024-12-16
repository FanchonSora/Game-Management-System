import React, { useState, useEffect } from "react";
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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components

// Container with Background Image
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e; /* Replace with desired color */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 2rem;
  color: #c7d5e0;
  animation: ${fadeIn} 1s ease-out;

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

// Hero Section Styles
const Hero = styled.section`
  background: rgba(41, 46, 73, 0.8);
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  flex-wrap: wrap;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  width: 50%;
  min-width: 300px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeroTitle = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 1s ease-out;
`;

const HeroSubtitle = styled.p`
  color: #dddddd;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

// Styled Buttons with Animations
const FreeButton = styled.button`
  background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    background-color: #5aa8e6;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(102, 192, 244, 0.5);
  }
`;

const ViewButton = styled.button`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    background-color: #28b54a;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(46, 204, 113, 0.5);
  }
`;

// Featured Image in Hero Section
const HeroImage = styled.img`
  width: 45%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 2rem;
  }
`;

// Products Section Styles
const ProductsSectionContainer = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
`;

// Grid Layout for Products
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

// Product Card Styles with Hover Animation
const Card = styled.div`
  background: #292e49;
  padding: 1.5rem;
  border-radius: 12px;
  color: #c7d5e0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  animation: ${pulse} 2s infinite;

  &:hover svg {
    fill: #ff4d6d;
    stroke: #ff4d6d;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 5px 0;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const CardCategory = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #aaaaaa;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
`;

const CardPrice = styled.p`
  font-size: 1rem;
  color: #ff4d6d;
  margin-bottom: 1rem;
  font-weight: bold;
`;

// HeartIcon Component (SVG)
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

// ProductCard Component
const ProductCard = ({ product, toggleFavorite, viewDetails, isFavorite }) => {
  return (
    <Card>
      <FavoriteButton onClick={() => toggleFavorite(product.id)}>
        <HeartIcon filled={isFavorite} />
      </FavoriteButton>
      <CardImage src={product.image} alt={product.title} />
      <CardTitle>{product.title}</CardTitle>
      <CardCategory>{product.category}</CardCategory>
      <CardPrice>
        {product.price === 0 ? "Free" : `$${product.price.toFixed(2)}`}
      </CardPrice>
      <ButtonGroup>
        {product.price === 0 && (
          <FreeButton onClick={() => toggleFavorite(product.id)}>
            Free
          </FreeButton>
        )}
        <ViewButton onClick={() => viewDetails(product.id)}>
          View
        </ViewButton>
      </ButtonGroup>
    </Card>
  );
};

// ProductsSection Component
const ProductsSection = ({
  title,
  products,
  toggleFavorite,
  viewDetails,
  favorites,
}) => {
  return (
    <ProductsSectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            toggleFavorite={toggleFavorite}
            viewDetails={viewDetails}
            isFavorite={favorites.has(product.id)}
          />
        ))}
      </Grid>
    </ProductsSectionContainer>
  );
};

// HeroSection Component
const HeroSection = ({ navigate }) => {
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>Welcome to Your Game Store</HeroTitle>
        <HeroSubtitle>
          Discover the latest releases and your next favorite game.
        </HeroSubtitle>
        <ButtonGroup>
          <FreeButton onClick={() => navigate("/market-game")}>
            Shop Market Game
          </FreeButton>
          <FreeButton onClick={() => navigate("/market-code")}>
            Shop Market Code
          </FreeButton>
        </ButtonGroup>
      </HeroContent>
      <HeroImage
        src="img3.jpg"
        alt="Featured Game"
        loading="lazy"
      />
    </Hero>
  );
};

// HomePage Component
const HomePage = () => {
  const navigate = useNavigate();

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return new Set(storedFavorites);
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  // Sample Products Data
  const products = [
    // Featured Games
    {
      id: 1,
      title: "Asterigos: Curse of the Stars",
      category: "Featured",
      price: 39.99,
      image: "/game/Asterigos.jpg",
    },
    {
      id: 2,
      title: "Elden Ring",
      category: "Featured",
      price: 59.99,
      image: "/game/Elden Ring.jpg",
    },
    {
      id: 3,
      title: "Cyberpunk 2077",
      category: "Featured",
      price: 49.99,
      image: "/game/Cyberpunk 2077.jpg",
    },
    // Massively Multiplayer Games
    {
      id: 4,
      title: "Foxhole",
      category: "Massively Multiplayer",
      price: 0.0,
      image: "/game/Foxhole.jpg",
    },
    {
      id: 5,
      title: "Hell Let Loose",
      category: "Massively Multiplayer",
      price: 59.99,
      image: "/game/Hell Let Loose.jpg",
    },
    {
      id: 6,
      title: "SCUM",
      category: "Massively Multiplayer",
      price: 29.99,
      image: "/game/SCUM.jpg",
    },
    // Casual Games
    {
      id: 7,
      title: "Goat Simulator 3",
      category: "Casual",
      price: 19.99,
      image: "/game/Goat Simulator 3.jpg",
    },
    {
      id: 8,
      title: "Luma Island",
      category: "Casual",
      price: 9.99,
      image: "/game/Luma Island.jpg",
    },
    {
      id: 9,
      title: "F1 24",
      category: "Casual",
      price: 49.99,
      image: "/game/F1 24.jpg",
    },
    {
      id: 10,
      title: "Dreamlight Valley",
      category: "Casual",
      price: 29.99,
      image: "/game/Dreamlight Valley.jpg",
    },
    // Additional Games
    {
      id: 11,
      title: "War Thunder",
      category: "Massively Multiplayer",
      price: 0.0,
      image: "/game/War Thunder.jpg",
    },
    {
      id: 12,
      title: "Albion Online",
      category: "Massively Multiplayer",
      price: 0.0,
      image: "/game/Albion Online.jpg",
    },
    {
      id: 13,
      title: "Candy Crush Saga",
      category: "Casual",
      price: 0.0,
      image: "/game/Candy Crush Saga.jpg",
    },
    {
      id: 14,
      title: "Among Us",
      category: "Casual",
      price: 0.0,
      image: "/game/Among Us.jpg",
    },
    {
      id: 15,
      title: "Crab Game",
      category: "Featured",
      price: 0.0,
      image: "/game/Crab Game.jpg",
    },
    // Add more games as needed
  ];

  // Toggle Favorite Function
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // View Details Function
  const viewDetails = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection navigate={navigate} />

      {/* Featured Games Section */}
      <ProductsSection
        title="Featured Games"
        products={products.filter((p) => p.category === "Featured")}
        toggleFavorite={toggleFavorite}
        viewDetails={viewDetails}
        favorites={favorites}
      />

      {/* Massively Multiplayer Games Section */}
      <ProductsSection
        title="Massively Multiplayer Games"
        products={products.filter((p) => p.category === "Massively Multiplayer")}
        toggleFavorite={toggleFavorite}
        viewDetails={viewDetails}
        favorites={favorites}
      />

      {/* Casual Games Section */}
      <ProductsSection
        title="Casual Games"
        products={products.filter((p) => p.category === "Casual")}
        toggleFavorite={toggleFavorite}
        viewDetails={viewDetails}
        favorites={favorites}
      />
    </Container>
  );
};

export default HomePage;
