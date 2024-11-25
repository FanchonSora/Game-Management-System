import React, { useState } from "react";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  const recentlyViewedHubs = [
    { id: 1, name: "Cube Racer", activity: "10 new screenshots this week" },
  ];

  const popularHubs = [
    { id: 1, name: "The Last of Us™ Part I", activity: "18 new artwork this week" },
    { id: 2, name: "Marvel's Guardians of the Galaxy", activity: "1 new artwork this week" },
    { id: 3, name: "Back 4 Blood", activity: "349 new screenshots this week" },
    { id: 4, name: "Batman™: Arkham Knight", activity: "2,966 new screenshots this week" },
  ];

  const tabs = ["All", "Screenshots", "Artwork", "Broadcasts", "Videos", "Workshop", "News", "Guides", "Reviews"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Community Activity</h1>
        <p style={styles.subtitle}>Community and official content for all games and software on Steam.</p>
      </div>

      {/* Hubs Section */}
      <div style={styles.hubsSection}>
        <div style={styles.hub}>
          <h3 style={styles.hubTitle}>Your Recently Viewed Hubs</h3>
          {recentlyViewedHubs.map((hub) => (
            <p key={hub.id} style={styles.hubItem}>
              {hub.name} - <span style={styles.hubActivity}>{hub.activity}</span>
            </p>
          ))}
        </div>
        <div style={styles.hub}>
          <h3 style={styles.hubTitle}>Popular Hubs</h3>
          {popularHubs.map((hub) => (
            <p key={hub.id} style={styles.hubItem}>
              {hub.name} - <span style={styles.hubActivity}>{hub.activity}</span>
            </p>
          ))}
        </div>
        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Search for products"
            style={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Search for friends"
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Tabs Section */}
      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            style={tab === activeTab ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        <div style={styles.review}>
          <h3>Recommended</h3>
          <p style={styles.reviewText}>
            10 years later and it got online multiplayer. Never kill yourself.
          </p>
        </div>
        <div style={styles.guide}>
          <h3>S.T.A.L.K.E.R. 2: Heart of Chornobyl: Guide</h3>
          <p>How to upgrade your DLSS version of any game</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

// CSS-in-JS Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "28px",
    margin: 0,
  },
  subtitle: {
    fontSize: "16px",
    color: "#a9a9a9",
  },
  hubsSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  hub: {
    width: "30%",
    backgroundColor: "#171a21",
    padding: "20px",
    borderRadius: "10px",
  },
  hubTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  hubItem: {
    margin: 0,
    marginBottom: "10px",
  },
  hubActivity: {
    color: "#66c0f4",
  },
  searchSection: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  searchInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #2a475e",
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  activeTab: {
    backgroundColor: "#66c0f4",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  review: {
    width: "45%",
    backgroundColor: "#171a21",
    padding: "20px",
    borderRadius: "10px",
  },
  guide: {
    width: "45%",
    backgroundColor: "#171a21",
    padding: "20px",
    borderRadius: "10px",
  },
  reviewText: {
    color: "#a9a9a9",
  },
};
