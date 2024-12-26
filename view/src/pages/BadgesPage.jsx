import React from "react";

const BadgesPage = () => {
  const badges = [
    {
      id: 1,
      title: "Summer Sale 2024",
      level: 1,
      xp: 100,
      description: "0 of 10 cards collected",
      tasksRemaining: "No card drops remaining",
      cards: Array(5).fill("card-placeholder.png"),
    },
    {
      id: 2,
      title: "Pillar of Community",
      level: 1,
      xp: 0,
      description: "7 of 28 tasks completed",
      tasksRemaining: "21 tasks remaining",
      cards: [],
    },
    {
      id: 3,
      title: "Steam Awards Nomination Committee 2024",
      level: 0,
      xp: 0,
      description: "0 of 4 tasks completed",
      tasksRemaining: "4 tasks remaining",
      cards: [],
    },
  ];

  const renderBadge = (badge) => (
    <div key={badge.id} style={styles.badgeCard}>
      <div style={styles.badgeHeader}>
        <div>
          <h3 style={styles.badgeTitle}>{badge.title}</h3>
          <p style={styles.badgeLevel}>
            Level {badge.level} - {badge.xp} XP
          </p>
          <p style={styles.badgeDescription}>{badge.description}</p>
          <p style={styles.badgeTasks}>{badge.tasksRemaining}</p>
        </div>
        <div style={styles.badgeIcon}>🏆</div>
      </div>
      {badge.cards.length > 0 && (
        <div style={styles.cardContainer}>
          {badge.cards.map((card, index) => (
            <img key={index} src={card} alt="Card" style={styles.cardImage} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="avatar.jpg" alt="User Avatar" style={styles.avatar} />
        <div>
          <h1 style={styles.userName}>khanhngan1491</h1>
          <p style={styles.userLevel}>Level 100 | XP 2409</p>
        </div>
      </div>

      {/* Filter & Sort Section */}
      <div style={styles.filterSort}>
        {/* <button style={styles.filterButton}>Booster Pack Eligibility</button>
        <button style={styles.filterButton}>Booster Pack Creator</button> */}
        <div style={styles.sortButtons}>
          <button style={styles.sortButton}>In Progress</button>
          <button style={styles.sortButton}>Completed</button>
          <button style={styles.sortButton}>A - Z</button>
          <button style={styles.sortButton}>Rarity</button>
        </div>
      </div>

      {/* Badge List */}
      <div style={styles.badgeGrid}>
        {badges.map((badge) => renderBadge(badge))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1e3c72",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    background: "linear-gradient(to right, rgb(24, 40, 68), rgb(27, 63, 124))",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userName: {
    fontSize: "24px",
    margin: "0",
  },
  userLevel: {
    fontSize: "16px",
    color: "#66c0f4",
  },
  filterSort: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  filterButton: {
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  sortButtons: {
    display: "flex",
    gap: "10px",
  },
  sortButton: {
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  badgeGrid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  badgeCard: {
    backgroundColor: "#1e3c72",
    padding: "20px",
    borderRadius: "10px",
    background: "linear-gradient(to right, rgb(24, 40, 68), rgb(27, 63, 124))",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  badgeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  badgeTitle: {
    fontSize: "18px",
    marginBottom: "5px",
  },
  badgeLevel: {
    fontSize: "14px",
    color: "#66c0f4",
    marginBottom: "5px",
  },
  badgeDescription: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  badgeTasks: {
    fontSize: "14px",
    color: "#66c0f4",
  },
  badgeIcon: {
    fontSize: "32px",
  },
  cardContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  cardImage: {
    width: "60px",
    height: "90px",
    borderRadius: "5px",
  },
};

export default BadgesPage;
