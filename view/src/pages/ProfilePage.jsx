import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/profile/${username}`);
        if (!response.ok) {
          throw new Error("Profile not found");
        }
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (username) {
      fetchProfileData();
    } else {
      setError("No user logged in");
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.profileBanner}>
          <img
            src={userData.profile_banner}
            alt="Profile Banner"
            style={styles.bannerImage}
          />
        </div>
        <div style={styles.profileInfoContainer}>
          <img
            src={userData.profile_picture}
            alt="Profile"
            style={styles.profilePicture}
          />
          <div>
            <h2 style={styles.profileName}>{userData.name}</h2>
            <p style={styles.profileUsername}>{`${userData.username}`}</p>
            <p style={styles.profileInfo}>{userData.email || "No information given."}</p>
          </div>
          <button onClick={() => navigate("/edit-profile")} style={styles.editButton}>
            Edit Profile
          </button>
        </div>
      </header>

      <main style={styles.mainContent}>
        <section style={styles.recentActivitySection}>
          <h3 style={styles.sectionTitle}>Recent Activity</h3>
          <p style={styles.activityDuration}>0 hours past 2 weeks</p>
          <div style={styles.activityGrid}>
            {userData.recent_activity.map((activity) => (
              <div key={activity.id} style={styles.activityCard}>
                <img
                  src={activity.image}
                  alt={activity.title}
                  style={styles.activityImage}
                />
                <div style={styles.activityDetails}>
                  <h4 style={styles.activityTitle}>{activity.title}</h4>
                  <p style={styles.activityInfo}>
                    {activity.playTime} <br /> Last played on {activity.lastPlayed}
                  </p>
                  <p style={styles.achievementProgress}>
                    Achievement Progress: {activity.achievementProgress}
                  </p>
                  <div style={styles.progressBarContainer}>
                    <div
                      style={{
                        ...styles.progressBar,
                        width: `${(parseInt(activity.achievementProgress.split(" ")[0]) /
                            parseInt(activity.achievementProgress.split(" ")[2])) *
                          100
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.onlineSection}>
          <h3 style={styles.sectionTitle}>Currently Online</h3>
          <p style={styles.badges}>
            Badges: <span style={styles.badgeCount}>1</span>
          </p>
          <ul style={styles.onlineList}>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "linear-gradient(to right,rgb(24, 40, 68),rgb(27, 63, 124))",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  profileBanner: {
    position: "relative",
    height: "200px",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileInfoContainer: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    gap: "20px",
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "4px solid #ffffff",
  },
  profileName: {
    fontSize: "28px",
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
  editButton: {
    backgroundColor: "#1b8ebc",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    position: "absolute",
    right: "50px",
  },
  mainContent: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
  },
  recentActivitySection: {
    flex: 3,
    backgroundColor: "#1e3c72",
    padding: "20px",
    borderRadius: "10px",
    background: "linear-gradient(to right,rgb(24, 40, 68),rgb(27, 63, 124))",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  activityDuration: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#a9a9a9",
  },
  activityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  activityCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#273c75",
    padding: "15px",
    width: "90%",
    borderRadius: "10px",
    transition: "0.3s",
  },
  activityImage: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  activityInfo: {
    fontSize: "14px",
    color: "#a9a9a9",
  },
  progressBarContainer: {
    height: "8px",
    backgroundColor: "#576574",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "10px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1e90ff",
  },
  onlineSection: {
    flex: 1,
    backgroundColor: "#1e3c72",
    padding: "20px",
    borderRadius: "10px",
    background: "linear-gradient(to right,rgb(24, 40, 68),rgb(27, 63, 124))",
  },
  badges: {
    fontSize: "14px",
    color: "#e0e0e0",
  },
  badgeCount: {
    fontWeight: "bold",
  },
  onlineList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};
