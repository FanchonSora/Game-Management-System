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
    <div key={badge.id} style={styles.badgeContainer}>
      <div style={styles.badgeHeader}>
        <div style={styles.badgeInfo}>
          <div style={styles.badgeTitle}>{badge.title}</div>
          <div style={styles.badgeXP}>
            Level {badge.level} - {badge.xp} XP
          </div>
          <div style={styles.badgeDescription}>{badge.description}</div>
          <div style={styles.badgeTasks}>{badge.tasksRemaining}</div>
        </div>
        <div style={styles.badgeImagePlaceholder}>
          <span>Badge Icon</span>
        </div>
      </div>
      {badge.cards.length > 0 && (
        <div style={styles.cardsContainer}>
          {badge.cards.map((card, index) => (
            <img
              key={index}
              src={card}
              alt="Card"
              style={styles.cardImage}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <img
          src="user-avatar-placeholder.png"
          alt="User Avatar"
          style={styles.avatar}
        />
        <div style={styles.userInfo}>
          <h1 style={styles.userName}>khanhngan1491</h1>
          <div style={styles.userLevel}>
            <span>Level 0</span>
            <span style={styles.xp}>XP 0</span>
          </div>
          <div style={styles.userStatus}>
            You cannot level up because your account is limited. Please visit{" "}
            <a href="https://support.steampowered.com" style={styles.link}>
              Steam Support
            </a>{" "}
            for details.
          </div>
        </div>
      </div>

      {/* Sort and Filter Section */}
      <div style={styles.filterSort}>
        <button style={styles.filterButton}>View my booster pack eligibility</button>
        <button style={styles.filterButton}>Booster Pack Creator</button>
        <div style={styles.sortOptions}>
          <button style={styles.sortButton}>In Progress</button>
          <button style={styles.sortButton}>Completed</button>
          <button style={styles.sortButton}>A - Z</button>
          <button style={styles.sortButton}>Rarity</button>
        </div>
      </div>

      {/* Badges List */}
      <div style={styles.badgesList}>
        {badges.map((badge) => renderBadge(badge))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #3e4551",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "24px",
    margin: 0,
  },
  userLevel: {
    fontSize: "18px",
    margin: "5px 0",
  },
  xp: {
    marginLeft: "10px",
    fontWeight: "bold",
  },
  userStatus: {
    fontSize: "14px",
    marginTop: "10px",
  },
  link: {
    color: "#66c0f4",
    textDecoration: "none",
  },
  filterSort: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  filterButton: {
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "1px solid #3e4551",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  sortOptions: {
    display: "flex",
    gap: "10px",
  },
  sortButton: {
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "1px solid #3e4551",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  badgesList: {
    display: "grid",
    gap: "20px",
  },
  badgeContainer: {
    backgroundColor: "#171a21",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #3e4551",
  },
  badgeHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  badgeXP: {
    fontSize: "16px",
    color: "#66c0f4",
    marginBottom: "10px",
  },
  badgeDescription: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  badgeTasks: {
    fontSize: "14px",
    color: "#66c0f4",
  },
  badgeImagePlaceholder: {
    width: "80px",
    height: "80px",
    backgroundColor: "#2a475e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    color: "#c7d5e0",
  },
  cardsContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  cardImage: {
    width: "50px",
    height: "75px",
    backgroundColor: "#2a475e",
    borderRadius: "5px",
  },
};

export default BadgesPage;
