import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// HeartIcon Component
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

// Styled Components for Buttons
const FreeButton = styled.button`
  background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;

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
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #28b54a;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(46, 204, 113, 0.5);
  }
`;

// HeroSection Component
const HeroSection = ({ navigate }) => {
  return (
    <div style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Welcome to Your Game Store</h1>
        <p style={styles.heroSubtitle}>
          Discover the latest releases and your next favorite game.
        </p>
        <div style={styles.buttonGroup}>
          <FreeButton onClick={() => navigate("/market-game")}>
            Shop Market Game
          </FreeButton>
          <FreeButton onClick={() => navigate("/market-code")}>
            Shop Market Code
          </FreeButton>
        </div>
      </div>
      <img
        src="/images/hero-game.jpg"
        alt="Featured Game"
        style={styles.heroImage}
      />
    </div>
  );
};

// ProductCard Component
const ProductCard = ({ product, toggleFavorite, viewDetails, isFavorite }) => {
  return (
    <div style={styles.card}>
      <button
        style={styles.favoriteButton}
        onClick={() => toggleFavorite(product.id)}
      >
        <HeartIcon filled={isFavorite} />
      </button>
      <img
        src={product.image}
        alt={product.title}
        style={styles.cardImage}
      />
      <h3 style={styles.cardTitle}>{product.title}</h3>
      <p style={styles.cardCategory}>{product.category}</p>
      <p style={styles.cardPrice}>
        {product.price === "Free" ? "Free" : `$${product.price.toFixed(2)}`}
      </p>
      <div style={styles.buttonGroup}>
        {product.price === "Free" && (
          <FreeButton onClick={() => toggleFavorite(product.id)}>
            Free
          </FreeButton>
        )}
        <ViewButton onClick={() => viewDetails(product.id)}>
          View
        </ViewButton>
      </div>
    </div>
  );
};

// ProductsSection Component
const ProductsSection = ({ title, products, toggleFavorite, viewDetails, favorites }) => {
  return (
    <div style={styles.productsSection}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            toggleFavorite={toggleFavorite}
            viewDetails={viewDetails}
            isFavorite={favorites.has(product.id)}
          />
        ))}
      </div>
    </div>
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
      category: "Action RPG",
      price: 39.99,
      image: "/images/game1.jpg",
    },
    {
      id: 2,
      title: "Elden Ring",
      category: "Open World RPG",
      price: 59.99,
      image: "/images/game2.jpg",
    },
    {
      id: 3,
      title: "Cyberpunk 2077",
      category: "Sci-Fi RPG",
      price: 49.99,
      image: "/images/game3.jpg",
    },
    // Massively Multiplayer Games
    {
      id: 4,
      title: "Foxhole",
      category: "Massively Multiplayer",
      price: 0.0,
      image: "/images/foxhole.jpg",
    },
    {
      id: 5,
      title: "Hell Let Loose",
      category: "Massively Multiplayer",
      price: 59.99,
      image: "/images/hellletloose.jpg",
    },
    {
      id: 6,
      title: "SCUM",
      category: "Massively Multiplayer",
      price: 29.99,
      image: "/images/scum.jpg",
    },
    // Casual Games
    {
      id: 7,
      title: "Goat Simulator 3",
      category: "Casual",
      price: 19.99,
      image: "/images/goatsimulator.jpg",
    },
    {
      id: 8,
      title: "Luma Island",
      category: "Casual",
      price: 9.99,
      image: "/images/lumaisland.jpg",
    },
    {
      id: 9,
      title: "F1 24",
      category: "Casual",
      price: 49.99,
      image: "/images/f1.jpg",
    },
    {
      id: 10,
      title: "Dreamlight Valley",
      category: "Casual",
      price: 29.99,
      image: "/images/dreamlight.jpg",
    },
    // Additional Games
    {
      id: 11,
      title: "War Thunder",
      category: "Massively Multiplayer",
      price: 0.0,
      image: "/images/warthunder.jpg",
    },
    {
      id: 12,
      title: "Albion Online",
      category: "Massively Multiplayer",
      price: 0.0,
      image: "/images/albiononline.jpg",
    },
    {
      id: 13,
      title: "Candy Crush Saga",
      category: "Casual",
      price: 0.0,
      image: "/images/candycrush.jpg",
    },
    {
      id: 14,
      title: "Among Us",
      category: "Casual",
      price: 0.0,
      image: "/images/amongus.jpg",
    },
    {
      id: 15,
      title: "Crab Game",
      category: "Featured",
      price: 0.0,
      image: "/images/crabgame.jpg",
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
    <div style={styles.container}>
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
    </div>
  );
};

// Enhanced Styles
const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    padding: "2rem",
    minHeight: "100vh",
  },
  // Hero Section Styles
  hero: {
    background: "linear-gradient(135deg, #536976 0%, #292E49 100%)",
    borderRadius: "16px",
    padding: "3rem",
    marginBottom: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
    flexWrap: "wrap",
  },
  heroContent: {
    width: "50%",
    minWidth: "300px",
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
  },
  heroSubtitle: {
    color: "#dddddd",
    fontSize: "1rem",
    marginBottom: "2rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  // Products Section Styles
  productsSection: {
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#fff",
    textAlign: "center",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  // Product Card Styles
  card: {
    background: "#292E49",
    padding: "1.5rem",
    borderRadius: "12px",
    color: "#c7d5e0",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  favoriteButton: {
    position: "absolute",
    right: "1rem",
    top: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  featuredImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: "5px 0",
    color: "#ffffff",
    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
  },
  cardCategory: {
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    color: "#aaaaaa",
    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
  },
  cardPrice: {
    fontSize: "1rem",
    color: "#ff4d6d",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
};

export default HomePage;
