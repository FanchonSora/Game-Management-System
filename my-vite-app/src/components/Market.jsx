import React from 'react';

const MarketPage = () => {
  const massivelyMultiplayerGames = [
    { id: 1, title: 'Foxhole', price: '155.000đ', discount: '-38%', image: 'foxhole.jpg' },
    { id: 2, title: 'Hell Let Loose', price: '591.500đ', discount: '-50%', image: 'hellletloose.jpg' },
    { id: 3, title: 'SCUM', price: '282.500đ', discount: '-50%', image: 'scum.jpg' },
    { id: 4, title: 'Test Drive Unlimited', price: '469.000đ', discount: '-30%', image: 'testdrive.jpg' },
  ];

  const casualGames = [
    { id: 1, title: 'Goat Simulator 3', price: '127.000đ', discount: '-67%', image: 'goatsimulator.jpg' },
    { id: 2, title: 'Luma Island', price: '160.000đ', discount: '-20%', image: 'lumaisland.jpg' },
    { id: 3, title: 'F1 24', price: '436.000đ', discount: '-60%', image: 'f1.jpg' },
    { id: 4, title: 'Dreamlight Valley', price: '667.500đ', discount: '-25%', image: 'dreamlight.jpg' },
  ];

  const featuredGames = [
    { id: 1, title: 'Lord of the Rings: Return to Moria', price: '321.000đ', image: 'moria.jpg' },
    { id: 2, title: 'Ready or Not', price: '399.000đ', image: 'readyornot.jpg' },
    { id: 3, title: 'Dead by Daylight', price: '340.000đ', image: 'deadbydaylight.jpg' },
    { id: 4, title: 'WWE 2K24', price: '1.000.000đ', image: 'wwe2k24.jpg' },
    { id: 5, title: 'Stellaris', price: '664.000đ', image: 'stellaris.jpg', isLive: true },
  ];

  return (
    <div style={styles.container}>
      {/* Categories Section */}
      <div style={styles.categorySection}>
        <h2 style={styles.sectionTitle}>Massively Multiplayer</h2>
        <p style={styles.subtitle}>Recommended tag based on what you play</p>
        <div style={styles.grid}>
          {massivelyMultiplayerGames.map((game) => (
            <div key={game.id} style={styles.card}>
              <img src={game.image} alt={game.title} style={styles.image} />
              <div style={styles.cardContent}>
                <span style={styles.discount}>{game.discount}</span>
                <p style={styles.title}>{game.title}</p>
                <p style={styles.price}>{game.price}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 style={styles.sectionTitle}>Casual</h2>
        <p style={styles.subtitle}>Recommended tag based on what you play</p>
        <div style={styles.grid}>
          {casualGames.map((game) => (
            <div key={game.id} style={styles.card}>
              <img src={game.image} alt={game.title} style={styles.image} />
              <div style={styles.cardContent}>
                <span style={styles.discount}>{game.discount}</span>
                <p style={styles.title}>{game.title}</p>
                <p style={styles.price}>{game.price}</p>
              </div>
            </div>
          ))}
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
              <p style={styles.price}>{game.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1b2838',
    color: '#c7d5e0',
    padding: '20px',
  },
  categorySection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#aaa',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#2a475e',
    borderRadius: '10px',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '10px',
    position: 'relative',
  },
  image: {
    width: '100%',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  cardContent: {
    textAlign: 'left',
  },
  discount: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '5px',
    borderRadius: '3px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: '14px',
    color: '#fff',
  },
  featuredSection: {
    marginTop: '40px',
  },
  horizontalScroll: {
    display: 'flex',
    gap: '20px',
    overflowX: 'scroll',
  },
  featuredCard: {
    minWidth: '300px',
    textAlign: 'center',
  },
  featuredImage: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default MarketPage;
