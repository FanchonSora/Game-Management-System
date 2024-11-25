import React from "react";

const LibraryPage = () => {
  // Example game data
  const recentGames = [
    { id: 1, title: "Counter-Strike 2", image: "cs2.jpg", timePlayed: "77 min", lastPlayed: "1 week ago" },
    { id: 2, title: "Cube Racer", image: "cube.jpg", timePlayed: "15 min", lastPlayed: "2 weeks ago" },
    { id: 3, title: "TOXIKK", image: "toxikk.jpg", timePlayed: "5 min", lastPlayed: "3 weeks ago" },
    { id: 4, title: "One-armed Cook", image: "cook.jpg", timePlayed: "2 min", lastPlayed: "October 2023" },
    { id: 5, title: "Goose Goose Duck", image: "goose.jpg", timePlayed: "0 min", lastPlayed: "September 2023" },
  ];

  const recommendedGames = [
    { id: 1, title: "TOXIKK", image: "toxikk.jpg", description: "Free Edition Available Now" },
    { id: 2, title: "Poppy Playtime", image: "poppy.jpg", description: "Most Popular" },
    { id: 3, title: "Helltaker", image: "helltaker.jpg", description: "Among Players Like You" },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>Library</h2>
        <div style={styles.sidebarContent}>
          <p>Home</p>
          <p>Games</p>
          <div style={styles.allGames}>
            <p>All</p>
            <ul>
              <li>Bro Falls: Ultimate Showdown</li>
              <li>Business Tour</li>
              <li>Counter-Strike 2</li>
              <li>Cube Racer</li>
              <li>Goose Goose Duck</li>
              <li>One-armed Cook</li>
              <li>Poppy Playtime</li>
              <li>TOXIKK</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Recent Games */}
        <section style={styles.section}>
          <h3>Recent Games</h3>
          <div style={styles.gameGrid}>
            {recentGames.map((game) => (
              <div key={game.id} style={styles.gameCard}>
                <img src={game.image} alt={game.title} style={styles.gameImage} />
                <p style={styles.gameTitle}>{game.title}</p>
                <p style={styles.timePlayed}>
                  Time Played: {game.timePlayed}
                </p>
                <p style={styles.lastPlayed}>{game.lastPlayed}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Games */}
        <section style={styles.section}>
          <h3>Play Next</h3>
          <div style={styles.gameGrid}>
            {recommendedGames.map((game) => (
              <div key={game.id} style={styles.gameCard}>
                <img src={game.image} alt={game.title} style={styles.gameImage} />
                <p style={styles.gameTitle}>{game.title}</p>
                <p style={styles.description}>{game.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LibraryPage;

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#2a475e",
    padding: "20px",
    color: "#66c0f4",
  },
  sidebarContent: {
    marginTop: "20px",
  },
  allGames: {
    marginTop: "20px",
  },
  mainContent: {
    width: "80%",
    padding: "20px",
  },
  section: {
    marginBottom: "40px",
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  gameCard: {
    backgroundColor: "#171a21",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },
  gameImage: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  gameTitle: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  timePlayed: {
    fontSize: "12px",
    color: "#a9a9a9",
  },
  lastPlayed: {
    fontSize: "12px",
    color: "#a9a9a9",
  },
  description: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#a9a9a9",
  },
};
