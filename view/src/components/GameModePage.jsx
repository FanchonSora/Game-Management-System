import React from "react";
import { useParams } from "react-router-dom"; // Get dynamic params

const GameModePage = () => {
  const { id } = useParams(); // Extract the game ID from the URL

  const games = {
    1: "Bro Falls: Ultimate Showdown",
    2: "Business Tour",
    3: "Counter-Strike 2",
    4: "Cube Racer",
    5: "Goose Goose Duck",
    6: "One-armed Cook",
    7: "Poppy Playtime",
    8: "TOXIKK",
  };

  const gameTitle = games[id];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.gameTitle}>{gameTitle}</h1>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h2 style={styles.subtitle}>Choose Game Mode</h2>
        <div style={styles.modes}>
          <button style={styles.button}>Single Player</button>
          <button style={styles.button}>Multiplayer</button>
          <button style={styles.button}>Custom Mode</button>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    minHeight: "100vh",
    backgroundImage: "url('https://i.imgur.com/your-background-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  header: {
    padding: "40px 20px 20px 20px",
    textAlign: "center",
    backgroundColor: "rgba(21, 32, 43, 0.8)",
  },
  gameTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: 0,
  },
  content: {
    padding: "20px",
    backgroundColor: "rgba(21, 32, 43, 0.8)",
    margin: "20px auto",
    maxWidth: "800px",
    borderRadius: "10px",
  },
  subtitle: {
    fontSize: "32px",
    marginBottom: "30px",
    textAlign: "center",
  },
  modes: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  button: {
    padding: "15px 30px",
    margin: "10px",
    backgroundColor: "#66c0f4",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#558bbd",
  },
};

export default GameModePage;
