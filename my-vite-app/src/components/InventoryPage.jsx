import React, { useState } from "react";

const InventoryPage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.profileSection}>
          <img
            src="/images/profile-placeholder.jpg" // Replace with your profile image path
            alt="Profile"
            style={styles.profileImage}
          />
          <h1 style={styles.profileName}>khanhngan1491</h1>
          <span style={styles.profileSubtitle}>» Item Inventory</span>
        </div>

        <div style={styles.actionSection}>
          <button style={styles.tradeButton}>Trade Offers</button>
          <div style={styles.dropdown}>
            <button style={styles.dropdownButton} onClick={toggleDropdown}>
              ...
            </button>
            {isDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <a href="/trade-history" style={styles.dropdownItem}>
                  View Trade History
                </a>
                <a href="/inventory-history" style={styles.dropdownItem}>
                  View Inventory History
                </a>
                <a href="/gift-history" style={styles.dropdownItem}>
                  View Gift History
                </a>
                <a href="/privacy-settings" style={styles.dropdownItem}>
                  Inventory Privacy Settings
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <p style={styles.emptyMessage}>
          khanhngan1491 currently has 0 items in their inventory.
        </p>
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
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #2a475e",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  profileName: {
    fontSize: "20px",
    color: "#fff",
  },
  profileSubtitle: {
    fontSize: "16px",
    color: "#c7d5e0",
    marginLeft: "5px",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tradeButton: {
    backgroundColor: "#3366ff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  dropdown: {
    position: "relative",
  },
  dropdownButton: {
    backgroundColor: "#2a475e",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "40px",
    right: "0",
    backgroundColor: "#2a475e",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 100,
    padding: "10px 0",
  },
  dropdownItem: {
    padding: "10px 20px",
    display: "block",
    color: "#c7d5e0",
    textDecoration: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
  dropdownItemHover: {
    backgroundColor: "#3366ff",
  },
  content: {
    textAlign: "center",
    marginTop: "50px",
  },
  emptyMessage: {
    fontSize: "18px",
    color: "#c7d5e0",
  },
};

export default InventoryPage;
