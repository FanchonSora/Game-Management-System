import React from "react";

const MarketCodePage = () => {
  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.navLinks}>
          <a href="/market-game" style={styles.navLink}>Market Game</a>
          <a href="/market-code" style={styles.navLink}>Market Code</a>
        </div>
      </div>

      {/* Content */}
      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Market Code</h2>
          <p style={styles.sidebarDescription}>Browse the best code snippets, libraries, and tools.</p>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <section>
            <h2 style={styles.sectionTitle}>Featured Code</h2>
            {/* Add your code list or featured items here */}
          </section>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(135deg, #182b3a 0%, #0d1c2e 100%)",
    color: "#c7d5e0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "15px 20px",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #0f2b44",
    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  navLinks: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },
  navLink: {
    color: "#66c0f4",
    textDecoration: "none",
    fontSize: "16px",
    position: "relative",
    transition: "color 0.3s ease",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "20%",
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(8px)",
    padding: "20px",
    borderRight: "1px solid #0f2b44",
    boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
  },
  sidebarTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#ffffff",
    textShadow: "0 1px 1px rgba(0,0,0,0.5)",
  },
  sidebarDescription: {
    fontSize: "14px",
    color: "#c7d5e0",
  },
  mainContent: {
    width: "80%",
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#ffffff",
    textShadow: "0 1px 1px rgba(0,0,0,0.5)",
  },
};

export default MarketCodePage;
