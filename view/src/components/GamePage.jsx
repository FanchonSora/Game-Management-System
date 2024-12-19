import React from "react";
import { useParams } from "react-router-dom";

// GameHeader Component
const GameHeader = ({ title, image }) => (
  <div style={styles.header}>
    <div style={styles.headerImageWrapper}>
      <img
        src={image}
        alt={title}
        style={styles.headerImage}
      />
    </div>
    <h1 style={styles.title}>{title}</h1>
  </div>
);

// GameDetails Component
const GameDetails = ({ genre, developer, releaseDate, rating }) => (
  <div style={styles.infoBox}>
    <p style={styles.infoText}>
      <strong>Genre:</strong> {genre}
    </p>
    <p style={styles.infoText}>
      <strong>Developer:</strong> {developer}
    </p>
    <p style={styles.infoText}>
      <strong>Release Date:</strong> {releaseDate}
    </p>
    <p style={styles.infoText}>
      <strong>Rating:</strong> {rating}
    </p>
  </div>
);

// GameDescription Component
const GameDescription = ({ description }) => (
  <div style={styles.descriptionBox}>
    <h2 style={styles.sectionTitle}>About This Game</h2>
    <p style={styles.descriptionText}>{description}</p>
  </div>
);

const GamePage = () => {
  const { id } = useParams();

  // Example game details
  const gameDetails = {
    1: {
      title: "Foxhole",
      description:
        "Foxhole is a persistent, massively multiplayer game of war. It is a top-down MMO where every player matters. Participate in strategic battles and contribute to the war effort.",
      image: "/game/Foxhole.jpg",
      genre: "Massively Multiplayer",
      developer: "Clashstar",
      releaseDate: "2018-02-28",
      rating: "9/10",
    },
    2: {
      title: "Hell Let Loose",
      description:
        "Hell Let Loose is a realistic World War II first-person shooter that emphasizes teamwork and strategy. Engage in large-scale battles with up to 100 players.",
      image: "/game/Hell Let Loose.jpg",
      genre: "Massively Multiplayer",
      developer: "Black Matter",
      releaseDate: "2019-06-23",
      rating: "8.5/10",
    },
    3: {
      title: "SCUM",
      description:
        "SCUM is an open-world survival game that combines realistic character customization with in-depth metabolism and crafting systems. Strive to survive against other players and the environment.",
      image: "/game/SCUM.jpg",
      genre: "Massively Multiplayer",
      developer: "Gamepires",
      releaseDate: "2020-08-29",
      rating: "8/10",
    },
    4: {
      title: "Test Drive Unlimited",
      description:
        "Test Drive Unlimited is a racing game that blends open-world exploration with high-speed racing. Drive across stunning landscapes and compete in various events.",
      image: "/game/Test Drive Unlimited.jpg",
      genre: "Racing",
      developer: "Eden Games",
      releaseDate: "2011-05-18",
      rating: "7.5/10",
    },
    5: {
      title: "War Thunder",
      description:
        "War Thunder is a comprehensive free-to-play vehicle combat MMO that includes aviation, armored vehicles, and naval craft from World War II and beyond.",
      image: "/game/War Thunder.jpg",
      genre: "Massively Multiplayer",
      developer: "Gaijin Entertainment",
      releaseDate: "2013-11-18",
      rating: "9/10",
    },
    6: {
      title: "Albion Online",
      description:
        "Albion Online is a sandbox MMORPG set in a medieval fantasy world. It features player-driven economy, classless combat, and a strong emphasis on player interaction.",
      image: "/game/Albion Online.jpg",
      genre: "Massively Multiplayer",
      developer: "Sandbox Interactive",
      releaseDate: "2017-07-17",
      rating: "8.5/10",
    },
    7: {
      title: "Candy Crush Saga",
      description:
        "Candy Crush Saga is a free-to-play match-three puzzle game that offers thousands of levels of addictive gameplay. Swap candies to make matches and complete objectives.",
      image: "/game/Candy Crush Saga.jpg",
      genre: "Casual",
      developer: "King",
      releaseDate: "2012-04-12",
      rating: "9/10",
    },
    8: {
      title: "Among Us",
      description:
        "Among Us is a multiplayer game where players work together to complete tasks on a spaceship, but some are impostors trying to sabotage and eliminate the crew.",
      image: "/game/Among Us.jpg",
      genre: "Casual",
      developer: "InnerSloth",
      releaseDate: "2018-06-15",
      rating: "9.5/10",
    },
    9: {
      title: "Crab Game",
      description:
        "Crab Game is a fun multiplayer party game inspired by the TV show Squid Game. Compete in various mini-games to survive and win the prize.",
      image: "/game/Crab Game.jpg",
      genre: "Party",
      developer: "Chucklefish",
      releaseDate: "2021-09-10",
      rating: "8.5/10",
    },
  };

  const game = gameDetails[id];

  if (!game) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Game Not Found</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <GameHeader title={game.title} image={game.image} />
      <div style={styles.details}>
        <GameDetails
          genre={game.genre}
          developer={game.developer}
          releaseDate={game.releaseDate}
          rating={game.rating}
        />
        <GameDescription description={game.description} />
      </div>
    </div>
  );
};

// Enhanced Styles for GamePage
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(135deg, #0f1b2d 0%, #1b2838 100%)",
    color: "#c7d5e0",
    borderRadius: "12px",
    boxShadow: "0 6px 30px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2.5rem",
  },
  headerImageWrapper: {
    width: "300px",
    height: "auto",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
    transition: "transform 0.3s ease",
  },
  headerImage: {
    width: "100%",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
  },
  title: {
    fontSize: "2.8rem",
    marginTop: "1.5rem",
    textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
    textAlign: "center",
    fontWeight: "600",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  infoBox: {
    background: "rgba(27, 40, 56, 0.8)",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #0f2b44",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  infoText: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#ffffff",
    textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
    fontWeight: "500",
  },
  descriptionBox: {
    background: "rgba(27, 40, 56, 0.8)",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #0f2b44",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  descriptionText: {
    lineHeight: "1.7",
    fontSize: "1rem",
  },
};

// Add hover effect for image wrapper
styles.headerImageWrapper[':hover'] = {
  transform: "scale(1.05)",
};
styles.headerImage[':hover'] = {
  transform: "scale(1.05)",
};

export default GamePage;
