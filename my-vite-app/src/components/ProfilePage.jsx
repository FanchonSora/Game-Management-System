import React from "react";

const ProfilePage = () => {
  const recentActivity = [
    {
      id: 1,
      title: "Counter-Strike 2",
      image: "cs2.jpg",
      playTime: "1.3 hrs on record",
      lastPlayed: "17 Nov",
      achievementProgress: "1 of 1",
    },
    {
      id: 2,
      title: "Cube Racer",
      image: "cube.jpg",
      playTime: "41 hrs on record",
      lastPlayed: "10 Nov",
      achievementProgress: "0 of 24",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.header}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={styles.profilePicture}
        />
        <div style={styles.profileDetails}>
          <h2 style={styles.profileName}>khanhngan1491</h2>
          <p style={styles.profileUsername}>khanhngan</p>
          <p style={styles.profileInfo}>No information given.</p>
        </div>
        <div style={styles.levelSection}>
          <p style={styles.levelText}>Level 0</p>
          <button style={styles.editButton}>Edit Profile</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Recent Activity */}
        <div style={styles.recentActivity}>
          <h3 style={styles.sectionTitle}>Recent Activity</h3>
          <p style={styles.activityDuration}>0 hours past 2 weeks</p>
          {recentActivity.map((activity) => (
            <div key={activity.id} style={styles.activityCard}>
              <img src={activity.image} alt={activity.title} style={styles.activityImage} />
              <div style={styles.activityDetails}>
                <h4 style={styles.activityTitle}>{activity.title}</h4>
                <p style={styles.activityInfo}>
                  {activity.playTime} <br /> Last played on {activity.lastPlayed}
                </p>
                <p style={styles.achievementProgress}>
                  Achievement Progress: {activity.achievementProgress}
                </p>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progress,
                      width: `${(parseInt(activity.achievementProgress.split(" ")[0]) / parseInt(activity.achievementProgress.split(" ")[2])) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Online Section */}
        <div style={styles.onlineSection}>
          <h3 style={styles.sectionTitle}>Currently Online</h3>
          <p style={styles.badges}>
            Badges: <span style={styles.badgeCount}>1</span>
          </p>
          <ul style={styles.onlineList}>
            <li>Games</li>
            <li>Inventory</li>
            <li>Screenshots</li>
            <li>Videos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    height: "100vh",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  profileDetails: {
    flex: 1,
    marginLeft: "20px",
  },
  profileName: {
    fontSize: "24px",
    margin: 0,
  },
  profileUsername: {
    fontSize: "16px",
    color: "#a9a9a9",
  },
  profileInfo: {
    fontSize: "14px",
    color: "#a9a9a9",
  },
  levelSection: {
    textAlign: "right",
  },
  levelText: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  recentActivity: {
    width: "70%",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  activityDuration: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#a9a9a9",
  },
  activityCard: {
    display: "flex",
    backgroundColor: "#171a21",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  activityImage: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    marginRight: "20px",
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: "18px",
    margin: 0,
  },
  activityInfo: {
    fontSize: "14px",
    color: "#a9a9a9",
  },
  achievementProgress: {
    fontSize: "14px",
    marginTop: "10px",
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#2a475e",
    borderRadius: "5px",
    overflow: "hidden",
    marginTop: "5px",
  },
  progress: {
    height: "100%",
    backgroundColor: "#c7d5e0",
  },
  onlineSection: {
    width: "25%",
    backgroundColor: "#171a21",
    padding: "20px",
    borderRadius: "10px",
  },
  badges: {
    fontSize: "14px",
    marginBottom: "20px",
  },
  badgeCount: {
    color: "#66c0f4",
    fontWeight: "bold",
  },
  onlineList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  onlineListItem: {
    marginBottom: "10px",
    fontSize: "14px",
  },
};
