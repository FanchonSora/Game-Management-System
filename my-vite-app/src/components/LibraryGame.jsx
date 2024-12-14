import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [allGames, setAllGames] = useState([]);

  const marketRef = useRef(null);
  const libraryRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleClickOutside = (event) => {
    if (marketRef.current && !marketRef.current.contains(event.target)) {
      setMarketDropdownOpen(false);
    }
    if (libraryRef.current && !libraryRef.current.contains(event.target)) {
      setLibraryDropdownOpen(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Load library games from local storage
    const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];

    // Original games
    const originalGames = [
      { id: 1, name: "Bro Falls: Ultimate Showdown" },
      { id: 2, name: "Business Tour" },
      { id: 3, name: "Counter-Strike 2" },
      { id: 4, name: "Cube Racer" },
      { id: 5, name: "Goose Goose Duck" },
      { id: 6, name: "One-armed Cook" },
      { id: 7, name: "Poppy Playtime" },
      { id: 8, name: "TOXIKK" },
    ];

    // Merge stored games with original (avoid duplicates)
    const uniqueGames = [...originalGames];
    storedGames.forEach((g) => {
      if (!uniqueGames.find((ug) => ug.id === g.id)) {
        uniqueGames.push(g);
      }
    });

    setAllGames(uniqueGames);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter the game list based on the search term
  const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (gameId) => {
    navigate(`/library-game/${gameId}`); // Navigate to the specific game's page
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.navLinks}>
          {/* Market Dropdown */}
          <div style={styles.dropdown} ref={marketRef}>
            <button
              onClick={() => setMarketDropdownOpen(!isMarketDropdownOpen)}
              style={styles.navButton}
            >
              Market
            </button>
            {isMarketDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <a href="/market-game" style={styles.dropdownItem}>
                  Market Game
                </a>
                <a href="/market-code" style={styles.dropdownItem}>
                  Market Code
                </a>
              </div>
            )}
          </div>

          <a href="/community" style={styles.navLink}>
            Community
          </a>

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
                <a href="/home" style={styles.dropdownItem}>
                  Home
                </a>
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
                <a href="/activity" style={styles.dropdownItem}>
                  Activity
                </a>
                <a href="/profile" style={styles.dropdownItem}>
                  Profile
                </a>
                <a href="/friends" style={styles.dropdownItem}>
                  Friends
                </a>
                <a href="/badges" style={styles.dropdownItem}>
                  Badges
                </a>
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

      {/* Content */}
      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Library</h2>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {/* Game List */}
          <ul style={styles.sidebarList}>
            {filteredGames.map((game) => (
              <li
                key={game.id}
                style={styles.sidebarItem}
                onClick={() => handleGameClick(game.id)}
              >
                {game.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <section>
            <h2 style={styles.sectionTitle}>Recent Games</h2>
            <div style={styles.gameGrid}>
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  style={styles.gameCard}
                  onClick={() => handleGameClick(game.id)}
                >
                  <div style={styles.gameInfo}>
                    <p style={styles.gameTitle}>{game.name}</p>
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

// Updated Styles
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
  navButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#66c0f4",
    fontSize: "16px",
    cursor: "pointer",
    padding: 0,
    position: "relative",
    transition: "color 0.3s ease",
  },
  dropdown: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "35px",
    backgroundColor: "rgba(18, 32, 47, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid #0f2b44",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
    zIndex: 100,
    minWidth: "150px",
  },
  dropdownItem: {
    color: "#c7d5e0",
    textDecoration: "none",
    display: "block",
    padding: "8px 10px",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "background 0.3s ease",
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
  searchInput: {
    width: "90%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #66c0f4",
    backgroundColor: "#0f1c2c",
    color: "#c7d5e0",
    fontSize: "14px",
    outline: "none",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto",
  },
  sidebarItem: {
    marginBottom: "10px",
    cursor: "pointer",
    color: "#c7d5e0",
    fontSize: "14px",
    padding: "8px",
    borderRadius: "4px",
    transition: "background 0.3s ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.4",
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
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  gameCard: {
    backgroundColor: "rgba(15, 28, 44, 0.8)",
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #0f2b44",
  },
  gameInfo: {
    marginTop: "10px",
  },
  gameTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#c7d5e0",
  },
};

export default LibraryPage;
