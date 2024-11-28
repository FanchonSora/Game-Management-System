import React, { useState } from "react";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const friends = [
    { id: 1, name: "1gucci", status: "offline", lastOnline: "5 days ago", avatar: "avatar1.jpg" },
    { id: 2, name: "cristina31102004", status: "offline", lastOnline: "45 mins ago", avatar: "avatar2.jpg" },
    { id: 3, name: "EigHt", status: "offline", lastOnline: "8 hrs, 48 mins ago", avatar: "avatar3.jpg" },
    { id: 4, name: "Mít Td Bít", status: "offline", lastOnline: "2 days ago", avatar: "avatar4.jpg" },
    { id: 5, name: "Ryuuou", status: "offline", lastOnline: "7 days ago", avatar: "avatar5.jpg" },
    { id: 6, name: "Taivippro123", status: "offline", lastOnline: "8 hrs, 48 mins ago", avatar: "avatar6.jpg" },
  ];

  // Filter friends based on the search term
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.profileSection}>
          <img
            src="your-avatar.jpg" // Replace with actual avatar URL
            alt="Profile"
            style={styles.avatar}
          />
          <h1 style={styles.username}>khanhngan1491</h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>FRIENDS</h2>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>Your Friends</li>
            <li style={styles.sidebarItem}>Add a Friend</li>
            <li style={styles.sidebarItem}>Pending Invites</li>
            <li style={styles.sidebarItem}>Blocked</li>
            <li style={styles.sidebarItem}>Recently Played With</li>
            <li style={styles.sidebarItem}>Broadcast Moderators</li>
          </ul>
          <h2 style={styles.sidebarTitle}>FOLLOWING</h2>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>Followed Players</li>
            <li style={styles.sidebarItem}>Followed Games</li>
          </ul>
          <h2 style={styles.sidebarTitle}>GROUPS</h2>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>Your Groups</li>
          </ul>
        </div>

        {/* Friends Section */}
        <div style={styles.friendsSection}>
          <div style={styles.topBar}>
            <h2 style={styles.friendsTitle}>
              YOUR FRIENDS {friends.length} / 250
            </h2>
            <div style={styles.buttons}>
              <button style={styles.manageButton}>Manage Friends List</button>
              <button style={styles.addButton}>Add a Friend</button>
            </div>
          </div>

          {/* Search Bar */}
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search friends by name or game"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Friends List */}
          <div style={styles.friendsList}>
            <h3 style={styles.offlineTitle}>OFFLINE</h3>
            <div style={styles.friendCards}>
              {filteredFriends.map((friend) => (
                <div key={friend.id} style={styles.friendCard}>
                  <img
                    src={friend.avatar} // Replace with actual avatar URL
                    alt={friend.name}
                    style={styles.friendAvatar}
                  />
                  <div style={styles.friendInfo}>
                    <p style={styles.friendName}>{friend.name}</p>
                    <p style={styles.lastOnline}>Last Online {friend.lastOnline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#171a21",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  username: {
    fontSize: "24px",
  },
  body: {
    display: "flex",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#171a21",
    padding: "20px",
  },
  sidebarTitle: {
    color: "#66c0f4",
    marginBottom: "10px",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "20px",
  },
  sidebarItem: {
    marginBottom: "10px",
    cursor: "pointer",
  },
  friendsSection: {
    width: "80%",
    padding: "20px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  friendsTitle: {
    fontSize: "20px",
    color: "#c7d5e0",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  manageButton: {
    padding: "10px 20px",
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "none",
    cursor: "pointer",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },
  searchBar: {
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #66c0f4",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
  },
  friendsList: {
    marginTop: "20px",
  },
  offlineTitle: {
    color: "#66c0f4",
    marginBottom: "10px",
  },
  friendCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  friendCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#171a21",
    padding: "10px",
    borderRadius: "8px",
  },
  friendAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  friendInfo: {
    color: "#c7d5e0",
  },
  friendName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  lastOnline: {
    fontSize: "14px",
    color: "#a9a9a9",
  },
};

export default FriendsPage;
