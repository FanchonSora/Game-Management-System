import React from "react";
import { useParams } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  details: {
    display: "flex",
    gap: "2rem",
  },
  image: {
    width: "300px",
    borderRadius: "8px",
  },
  description: {
    flex: 1,
  },
};

const GamePage = () => {
  const { id } = useParams();

  const gameDetails = {
    1: {
      title: "Asterigos: Curse of the Stars",
      description:
        "An Action RPG set in a world filled with magical creatures and adventures.",
      image: "/images/game1.jpg",
    },
    2: {
      title: "Elden Ring",
      description:
        "An epic open-world RPG crafted by FromSoftware and George R.R. Martin.",
      image: "/images/game2.jpg",
    },
    3: {
      title: "Cyberpunk 2077",
      description: "A futuristic Sci-Fi RPG set in the sprawling Night City.",
      image: "/images/game3.jpg",
    },
  };

  const game = gameDetails[id];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{game.title}</h1>
      <div style={styles.details}>
        <img src={game.image} alt={game.title} style={styles.image} />
        <p style={styles.description}>{game.description}</p>
      </div>
    </div>
  );
};

export default GamePage;
