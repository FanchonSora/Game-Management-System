import React, { useState } from 'react';

const HeartIcon = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#ff4d6d" : "none"}
    stroke={filled ? "#ff4d6d" : "#666"}
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1b2838',
    color: '#c7d5e0',
  },
  hero: {
    background: 'linear-gradient(135deg, #536976 0%, #292E49 100%)',
    borderRadius: '16px',
    padding: '3rem',
    marginBottom: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
  },
  heroContent: {
    width: '50%',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    color: '#dddddd',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  heroButton: {
    backgroundColor: '#ff4d6d',
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 10px rgba(255, 77, 109, 0.4)',
  },
  heroImage: {
    width: '40%',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '2rem',
    color: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  card: {
    background: '#292E49',
    padding: '1.5rem',
    borderRadius: '12px',
    color: '#c7d5e0',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  cardCategory: {
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    color: '#aaaaaa',
  },
  cardPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ff4d6d',
  },
};

const HomePage = () => {
  const [favorites, setFavorites] = useState(new Set());

  const products = [
    {
      id: 1,
      title: 'Asterigos: Curse of the Stars',
      category: 'Action RPG',
      price: 39.99,
      image: '/images/game1.jpg',
    },
    {
      id: 2,
      title: 'Elden Ring',
      category: 'Open World RPG',
      price: 59.99,
      image: '/images/game2.jpg',
    },
    {
      id: 3,
      title: 'Cyberpunk 2077',
      category: 'Sci-Fi RPG',
      price: 49.99,
      image: '/images/game3.jpg',
    },
  ];

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

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Welcome to Your Game Store
          </h1>
          <p style={styles.heroSubtitle}>
            Discover the latest releases and your next favorite game.
          </p>
          <button style={styles.heroButton}>Shop Now</button>
        </div>
        <img
          src="/images/hero-game.jpg"
          alt="Featured Game"
          style={styles.heroImage}
        />
      </div>

      {/* Products Section */}
      <h2 style={styles.sectionTitle}>Featured Games</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <button
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                background: 'none',
                border: 'none',
              }}
              onClick={() => toggleFavorite(product.id)}
            >
              <HeartIcon filled={favorites.has(product.id)} />
            </button>
            <img
              src={product.image}
              alt={product.title}
              style={styles.cardImage}
            />
            <h3 style={styles.cardTitle}>{product.title}</h3>
            <p style={styles.cardCategory}>{product.category}</p>
            <p style={styles.cardPrice}>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
