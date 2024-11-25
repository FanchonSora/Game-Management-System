import React from "react";

const LibraryPage = () => {
  const recentGames = [
    { id: 1, title: "Counter-Strike 2", image: "cs2.jpg", timePlayed: "77 min", lastPlayed: "1 week ago" },
    { id: 2, title: "Cube Racer", image: "cube.jpg", timePlayed: "15 min", lastPlayed: "2 weeks ago" },
    { id: 3, title: "TOXIKK", image: "toxikk.jpg", timePlayed: "5 min", lastPlayed: "3 weeks ago" },
    { id: 4, title: "One-armed Cook", image: "cook.jpg", timePlayed: "2 min", lastPlayed: "October 2023" },
    { id: 5, title: "Goose Goose Duck", image: "goose.jpg", timePlayed: "0 min", lastPlayed: "September 2023" },
  ];

  const playNext = [
    { id: 1, title: "TOXIKK", image: "toxikk.jpg", description: "Free Edition Available Now" },
    { id: 2, title: "Poppy Playtime", image: "poppy.jpg", description: "Most Popular" },
    { id: 3, title: "Helltaker", image: "helltaker.jpg", description: "Among Players Like You" },
  ];

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>Game Library</h1>
        <div style={styles.navLinks}>
          <a href="/home" style={styles.navLink}>Home</a>
          <a href="/library-code" style={styles.navLink}>Library Code</a>
          <a href="/library-game" style={styles.navLink}>Library Game</a>
          <a href="/community" style={styles.navLink}>Community</a>
          <a href="/profile" style={styles.navLink}>Profile</a>
        </div>
      </div>

      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2>Library</h2>
          <div>
            <p style={styles.sidebarSectionTitle}>Games</p>
            <ul style={styles.sidebarList}>
              <li style={styles.sidebarItem}>Bro Falls: Ultimate Showdown</li>
              <li style={styles.sidebarItem}>Business Tour</li>
              <li style={styles.sidebarItem}>Counter-Strike 2</li>
              <li style={styles.sidebarItem}>Cube Racer</li>
              <li style={styles.sidebarItem}>Goose Goose Duck</li>
              <li style={styles.sidebarItem}>One-armed Cook</li>
              <li style={styles.sidebarItem}>Poppy Playtime</li>
              <li style={styles.sidebarItem}>TOXIKK</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Recent Games Section */}
          <section>
            <h2 style={styles.sectionTitle}>Recent Games</h2>
            <div style={styles.gameGrid}>
              {recentGames.map((game) => (
                <div key={game.id} style={styles.gameCard}>
                  <img src={game.image} alt={game.title} style={styles.gameImage} />
                  <div style={styles.gameInfo}>
                    <p style={styles.gameTitle}>{game.title}</p>
                    <p style={styles.gameDetails}>
                      Time Played: {game.timePlayed} <br />
                      Last Played: {game.lastPlayed}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Play Next Section */}
          <section>
            <h2 style={styles.sectionTitle}>Play Next</h2>
            <div style={styles.gameGrid}>
              {playNext.map((game) => (
                <div key={game.id} style={styles.gameCard}>
                  <img src={game.image} alt={game.title} style={styles.gameImage} />
                  <div style={styles.gameInfo}>
                    <p style={styles.gameTitle}>{game.title}</p>
                    <p style={styles.gameDescription}>{game.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    height: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#2a475e",
  },
  logo: {
    color: "#c7d5e0",
    fontSize: "24px",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#c7d5e0",
    textDecoration: "none",
    fontSize: "16px",
  },
  body: {
    display: "flex",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#2a475e",
    padding: "20px",
  },
  sidebarSectionTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#66c0f4",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
  },
  sidebarItem: {
    marginBottom: "10px",
    cursor: "pointer",
  },
  mainContent: {
    width: "80%",
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  gameCard: {
    backgroundColor: "#171a21",
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "center",
    padding: "10px",
  },
  gameImage: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  gameInfo: {
    marginTop: "10px",
  },
  gameTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  gameDetails: {
    fontSize: "12px",
    color: "#a9a9a9",
  },
  gameDescription: {
    fontSize: "14px",
    color: "#a9a9a9",
  },
};
