import React, { useState, useRef, useEffect } from "react";

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State để theo dõi từ khóa tìm kiếm
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const libraryRef = useRef(null);
  const profileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (libraryRef.current && !libraryRef.current.contains(event.target)) {
      setLibraryDropdownOpen(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const gamesList = [
    "Bro Falls: Ultimate Showdown",
    "Business Tour",
    "Counter-Strike 2",
    "Cube Racer",
    "Goose Goose Duck",
    "One-armed Cook",
    "Poppy Playtime",
    "TOXIKK",
  ];

  // Lọc danh sách game theo từ khóa
  const filteredGames = gamesList.filter((game) =>
    game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Thanh điều hướng trên cùng */}
      <div style={styles.navbar}>
        <div style={styles.navLinks}>
          <a href="/market" style={styles.navLink}>Market</a>
          <a href="/community" style={styles.navLink}>Community</a>

          {/* Library Dropdown */}
          <div style={styles.dropdown} ref={libraryRef}>
            <button
              onClick={() => setLibraryDropdownOpen(!isLibraryDropdownOpen)}
              style={styles.navButton}
            >
              Library
            </button>
            {isLibraryDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <a href="/home" style={styles.dropdownItem}>Home</a>
                <a href="/library-code" style={styles.dropdownItem}>
                  Library Code
                </a>
                <a href="/library-game" style={styles.dropdownItem}>
                  Library Game
                </a>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div style={styles.dropdown} ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              style={styles.navButton}
            >
              Personal Profile
            </button>
            {isProfileDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <a href="/activity" style={styles.dropdownItem}>Activity</a>
                <a href="/profile" style={styles.dropdownItem}>Profile</a>
                <a href="/friends" style={styles.dropdownItem}>Friends</a>
                <a href="/groups" style={styles.dropdownItem}>Groups</a>
                <a href="/content" style={styles.dropdownItem}>Content</a>
                <a href="/badges" style={styles.dropdownItem}>Badges</a>
                <a href="/inventory" style={styles.dropdownItem}>
                  Inventory
                </a>
                <a href="/year-in-review" style={styles.dropdownItem}>
                  Year In Review
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2>Library</h2>
          {/* Thanh tìm kiếm */}
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {/* Danh sách game */}
          <ul style={styles.sidebarList}>
            {filteredGames.map((game, index) => (
              <li key={index} style={styles.sidebarItem}>
                {game}
              </li>
            ))}
          </ul>
        </div>

        {/* Nội dung chính */}
        <div style={styles.mainContent}>
          <section>
            <h2 style={styles.sectionTitle}>Recent Games</h2>
            <div style={styles.gameGrid}>
              {gamesList.map((game, index) => (
                <div key={index} style={styles.gameCard}>
                  <div style={styles.gameInfo}>
                    <p style={styles.gameTitle}>{game}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#2a475e",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  navLink: {
    color: "#c7d5e0",
    textDecoration: "none",
    fontSize: "16px",
  },
  navButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#c7d5e0",
    fontSize: "16px",
    cursor: "pointer",
    padding: 0,
  },
  dropdown: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "30px",
    backgroundColor: "#2a475e",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 100,
  },
  dropdownItem: {
    color: "#c7d5e0",
    textDecoration: "none",
    display: "block",
    padding: "5px 10px",
  },
  body: {
    display: "flex",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#2a475e",
    padding: "20px",
  },
  searchInput: {
    width: "90%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #66c0f4",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
  },
  sidebarItem: {
    marginBottom: "10px",
    cursor: "pointer",
    color: "#c7d5e0",
    fontSize: "14px",
  },
  mainContent: {
    width: "80%",
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  gameCard: {
    backgroundColor: "#171a21",
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "center",
    padding: "10px",
  },
  gameInfo: {
    marginTop: "10px",
  },
  gameTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default LibraryPage;
