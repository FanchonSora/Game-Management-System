import React from "react";

const GameLibrary = () => {
  const games = [
    { id: 1, name: "Game-Management-System", language: "JavaScript", updated: "6 hours ago" },
    { id: 2, name: "Matrix-Calculator-Web", language: "HTML", updated: "yesterday" },
    { id: 3, name: "Basic-Chat-Box", language: "Python", updated: "Sep 9" },
    { id: 4, name: "Object-Detection-Game", language: "Python", updated: "Sep 9" },
    { id: 5, name: "Event-Management", language: "TypeScript", updated: "Aug 30" },
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={styles.profilePicture}
        />
        <div>
          <h2 style={styles.profileName}>Fanchon_Sora</h2>
          <p style={styles.profileUsername}>FanchonSora</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={styles.tabButton}>Overview</button>
        <button style={styles.tabButton}>Repositories</button>
        <button style={styles.tabButton}>Projects</button>
        <button style={styles.tabButton}>Packages</button>
        <button style={styles.tabButton}>Stars</button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Find a repository..."
          style={styles.searchInput}
        />
        <button style={styles.newButton}>New</button>
      </div>

      {/* Game List */}
      <div>
        {games.map((game) => (
          <div key={game.id} style={styles.gameCard}>
            <div style={styles.gameDetails}>
              <h3 style={styles.gameTitle}>{game.name}</h3>
              <p style={styles.language}>
                {game.language} <span style={styles.updated}>Updated {game.updated}</span>
              </p>
            </div>
            <div>
              <button style={styles.starButton}>★ Star</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;

// CSS styles in JS
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f6f8fa",
    color: "#24292e",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  profileName: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  profileUsername: {
    margin: 0,
    color: "#57606a",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tabButton: {
    padding: "10px 15px",
    backgroundColor: "#fff",
    border: "1px solid #d0d7de",
    borderRadius: "6px",
    cursor: "pointer",
  },
  searchBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  searchInput: {
    width: "80%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d0d7de",
  },
  newButton: {
    padding: "10px 15px",
    backgroundColor: "#2ea44f",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  gameCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  gameDetails: {
    display: "flex",
    flexDirection: "column",
  },
  gameTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  language: {
    margin: 0,
    fontSize: "14px",
    color: "#57606a",
  },
  updated: {
    marginLeft: "10px",
    fontSize: "12px",
    color: "#57606a",
  },
  starButton: {
    padding: "5px 10px",
    backgroundColor: "#f6f8fa",
    border: "1px solid #d0d7de",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
