import React, { useState } from "react";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "1gucci",
      status: "offline",
      lastOnline: "5 days ago",
      avatar: "avatar1.jpg",
    },
    {
      id: 2,
      name: "cristina31102004",
      status: "offline",
      lastOnline: "45 mins ago",
      avatar: "avatar2.jpg",
    },
    {
      id: 3,
      name: "EigHt",
      status: "offline",
      lastOnline: "8 hrs, 48 mins ago",
      avatar: "avatar3.jpg",
    },
  ]);

  const [receivedInvites, setReceivedInvites] = useState([
    { id: 101, name: "Alice", avatar: "avatar7.jpg" },
    { id: 102, name: "Bob", avatar: "avatar8.jpg" },
  ]);

  const [sentInvites, setSentInvites] = useState([]);
  const [viewPendingInvites, setViewPendingInvites] = useState(false);
  const [isViewingReceived, setIsViewingReceived] = useState(true);
  const [isAddFriendVisible, setIsAddFriendVisible] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");

  const handleAddFriend = () => {
    if (!newFriendName.trim()) {
      alert("Name cannot be empty!");
      return;
    }

    const randomAvatar = `avatar${Math.floor(Math.random() * 10) + 1}.jpg`;

    setSentInvites((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newFriendName,
        avatar: randomAvatar,
      },
    ]);

    alert(`Friend request sent to ${newFriendName}!`);
    setNewFriendName("");
    setIsAddFriendVisible(false);
  };

  const handleAcceptInvite = (id) => {
    const invite = receivedInvites.find((i) => i.id === id);

    if (invite) {
      setFriends((prev) => [
        ...prev,
        {
          id: invite.id,
          name: invite.name,
          status: "offline",
          lastOnline: "Just now",
          avatar: invite.avatar,
        },
      ]);
      setReceivedInvites((prev) => prev.filter((i) => i.id !== id));
      alert(`${invite.name} has been added to your friends list!`);
    }
  };

  const handleIgnoreInvite = (id) => {
    setReceivedInvites((prev) => prev.filter((i) => i.id !== id));
    alert("Invite ignored.");
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReceivedInvites = receivedInvites.filter((invite) =>
    invite.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSentInvites = sentInvites.filter((invite) =>
    invite.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.profileSection}>
          <img src="avatar.jpg" alt="Profile" style={styles.avatar} />
          <h1 style={styles.username}>khanhngan1491</h1>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <nav style={styles.sidebar}>
          <h2 style={styles.sectionTitle}>FRIENDS</h2>
          <ul style={styles.sidebarList}>
            <li
              style={styles.sidebarItem}
              onClick={() => setViewPendingInvites(false)}
            >
              Your Friends
            </li>
            <li
              style={styles.sidebarItem}
              onClick={() => setViewPendingInvites(true)}
            >
              Pending Invites
            </li>
          </ul>
        </nav>

        {/* Friends Section */}
        <section style={styles.friendsSection}>
          <div style={styles.topBar}>
            <h2 style={styles.friendsTitle}>
              {viewPendingInvites
                ? "PENDING INVITES"
                : `YOUR FRIENDS ${friends.length} / 250`}
            </h2>
            <button
              onClick={() => setIsAddFriendVisible((prev) => !prev)}
              style={styles.addFriendToggleButton}
            >
              {isAddFriendVisible ? "Cancel Add Friend" : "Add Friend"}
            </button>
          </div>

          {/* Add Friend Section */}
          {isAddFriendVisible && (
            <div style={styles.addFriendSection}>
              <input
                type="text"
                placeholder="Enter friend's name"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                style={styles.addFriendInput}
              />
              <button onClick={handleAddFriend} style={styles.addFriendButton}>
                Confirm Add
              </button>
            </div>
          )}

          {/* Pending Invites Section */}
          {viewPendingInvites && (
            <>
              <div style={styles.tabs}>
                <button
                  style={{
                    ...styles.tabButton,
                    backgroundColor: isViewingReceived ? "#2a475e" : "#171a21",
                  }}
                  onClick={() => setIsViewingReceived(true)}
                >
                  Received Invites
                </button>
                <button
                  style={{
                    ...styles.tabButton,
                    backgroundColor: !isViewingReceived ? "#2a475e" : "#171a21",
                  }}
                  onClick={() => setIsViewingReceived(false)}
                >
                  Sent Invites
                </button>
              </div>
              <div style={styles.friendsList}>
                {isViewingReceived
                  ? filteredReceivedInvites.map((invite) => (
                      <div key={invite.id} style={styles.friendCard}>
                        <img
                          src={invite.avatar}
                          alt={invite.name}
                          style={styles.friendAvatar}
                        />
                        <div style={styles.friendInfo}>
                          <p style={styles.friendName}>{invite.name}</p>
                          <div style={styles.inviteActions}>
                            <button
                              onClick={() => handleAcceptInvite(invite.id)}
                              style={styles.acceptButton}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleIgnoreInvite(invite.id)}
                              style={styles.ignoreButton}
                            >
                              Ignore
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : filteredSentInvites.map((invite) => (
                      <div key={invite.id} style={styles.friendCard}>
                        <img
                          src={invite.avatar}
                          alt={invite.name}
                          style={styles.friendAvatar}
                        />
                        <div style={styles.friendInfo}>
                          <p style={styles.friendName}>{invite.name}</p>
                          <p style={styles.statusText}>Invite Sent</p>
                        </div>
                      </div>
                    ))}
              </div>
            </>
          )}

          {/* Friends List */}
          {!viewPendingInvites && (
            <div style={styles.friendsList}>
              {filteredFriends.map((friend) => (
                <div key={friend.id} style={styles.friendCard}>
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    style={styles.friendAvatar}
                  />
                  <div style={styles.friendInfo}>
                    <p style={styles.friendName}>{friend.name}</p>
                    <p style={styles.lastOnline}>
                      Last Online {friend.lastOnline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#171a21",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid #3a4756",
  },
  profileSection: { display: "flex", alignItems: "center", gap: "15px" },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "2px solid white",
  },
  username: { fontSize: "24px", color: "#66c0f4" },
  mainContent: { display: "flex", flexGrow: 1 },
  sidebar: {
    width: "250px",
    backgroundColor: "#171a21",
    padding: "20px",
    borderRight: "2px solid #3a4756",
  },
  sectionTitle: { fontSize: "16px", color: "#66c0f4", marginBottom: "10px" },
  sidebarList: { listStyle: "none", padding: 0 },
  sidebarItem: { marginBottom: "10px", cursor: "pointer", color: "#c7d5e0" },
  friendsSection: { flexGrow: 1, padding: "20px" },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  addFriendToggleButton: {
    padding: "10px 15px",
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addFriendSection: { display: "flex", gap: "10px", marginBottom: "20px" },
  addFriendInput: {
    flexGrow: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "2px solid #66c0f4",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
  },
  addFriendButton: {
    padding: "10px 15px",
    backgroundColor: "#2a475e",
    color: "#c7d5e0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  searchBar: { marginBottom: "20px" },
  searchInput: {
    width: "98%",
    padding: "10px",
    borderRadius: "4px",
    border: "2px solid #66c0f4",
    backgroundColor: "#1b2838",
    color: "#c7d5e0",
  },
  friendsList: {
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  friendAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "15px",
  },
  friendInfo: { display: "flex", flexDirection: "column" },
  friendName: { fontSize: "16px", fontWeight: "bold" },
  lastOnline: { fontSize: "14px", color: "#a9a9a9" },
  noFriendsMessage: { textAlign: "center", color: "#a9a9a9" },
  tabs: { display: "flex", marginBottom: "20px" },
  tabButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    cursor: "pointer",
    color: "#c7d5e0",
  },
  statusText: { fontSize: "14px", color: "#a9a9a9" },
  inviteActions: { display: "flex", gap: "10px" },
  acceptButton: { backgroundColor: "#4CAF50", color: "white", border: "none" },
  ignoreButton: { backgroundColor: "#f44336", color: "white", border: "none" },
};

export default FriendsPage;
