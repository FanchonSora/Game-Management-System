import React from 'react';
import { useNavigate } from 'react-router-dom';

// HeartIcon Component (for future use if needed)
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

const MarketGamePage = () => {
  const navigate = useNavigate();

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

  const featuredGames = [
    { id: 9, title: 'Lord of the Rings: Return to Moria', price: '321.000đ', image: '/game/Lord of the Rings.jpg' },
    { id: 10, title: 'Ready or Not', price: '399.000đ', image: '/game/Ready or Not.jpg' },
    { id: 11, title: 'Dead by Daylight', price: '340.000đ', image: '/game/Dead by Daylight.jpg' },
    { id: 12, title: 'WWE 2K24', price: '1.000.000đ', image: '/game/WWE 2K24.jpg' },
    { id: 13, title: 'Stellaris', price: '664.000đ', image: '/game/Stellaris.jpg', isLive: true },
    { id: 18, title: 'Crab Game', price: 'Free', image: '/game/Crab Game.jpg' },
  ];

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

  const handleView = (game) => {
    navigate(`/game/${game.id}`);
  };

  const renderGameCards = (games) => {
    return games.map((game) => (
      <div key={game.id} style={styles.card}>
        {game.discount && <div style={styles.discountBadge}>{game.discount}</div>}
        <img src={game.image} alt={game.title} style={styles.image} />
        <div style={styles.cardContent}>
          <p style={styles.title}>{game.title}</p>
          <p style={styles.price}>{game.price === 'Free' ? 'Free' : game.price}</p>
          <div style={styles.buttonGroup}>
            {game.price === 'Free' && (
              <button style={styles.freeButton} onClick={() => handleFree(game)}>ADD</button>
            )}
            <button style={styles.viewButton} onClick={() => handleView(game)}>VIEW</button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      {/* Categories Section */}
      <div style={styles.categorySection}>
        <h2 style={styles.sectionTitle}>Massively Multiplayer</h2>
        <p style={styles.subtitle}>Recommended tag based on what you play</p>
        <div style={styles.grid}>
          {renderGameCards(massivelyMultiplayerGames)}
        </div>

        <h2 style={styles.sectionTitle}>Casual</h2>
        <p style={styles.subtitle}>Recommended tag based on what you play</p>
        <div style={styles.grid}>
          {renderGameCards(casualGames)}
        </div>
      </div>

      {/* Featured Games Section */}
      <div style={styles.featuredSection}>
        <h2 style={styles.sectionTitle}>Featured Games</h2>
        <div style={styles.horizontalScroll}>
          {featuredGames.map((game) => (
            <div key={game.id} style={styles.featuredCard}>
              <img src={game.image} alt={game.title} style={styles.featuredImage} />
              <p style={styles.title}>{game.title}</p>
              <p style={styles.price}>{game.price === 'Free' ? 'Free' : game.price}</p>
              <div style={styles.buttonGroup}>
                {game.price === 'Free' && (
                  <button style={styles.freeButton} onClick={() => handleFree(game)}>ADD</button>
                )}
                <button style={styles.viewButton} onClick={() => handleView(game)}>VIEW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Styles
const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(135deg, #182b3a 0%, #0d1c2e 100%)",
    color: "#c7d5e0",
    padding: "20px",
    minHeight: "100vh",
  },
  categorySection: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#ffffff",
    textShadow: "0 1px 1px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "20px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  featuredSection: {
    marginTop: "40px",
  },
  horizontalScroll: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "10px",
  },
  card: {
    backgroundColor: "rgba(42,71,94,0.8)",
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "center",
    padding: "15px",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #0f2b44",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  discountBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "5px 8px",
    borderRadius: "3px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
    marginBottom: "10px",
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
  cardContent: {
    textAlign: "left",
    marginTop: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "5px 0",
    color: "#ffffff",
    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
  },
  price: {
    fontSize: "16px",
    color: "#ff4d6d",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  freeButton: {
    backgroundColor: "#66c0f4",
    border: "none",
    borderRadius: "5px",
    color: "#000",
    padding: "8px 15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
    boxShadow: "0 2px 5px rgba(102, 192, 244, 0.5)",
  },
  viewButton: {
    backgroundColor: "#2ecc71",
    border: "none",
    borderRadius: "5px",
    color: "#000",
    padding: "8px 15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
    boxShadow: "0 2px 5px rgba(46, 204, 113, 0.5)",
  },
};

export default MarketGamePage;
