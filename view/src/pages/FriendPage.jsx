// File: src/pages/FriendsPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/Navbar";
import { Trash2 } from "lucide-react"; // Importing the delete icon from lucide-react

const FriendsPage = () => {
  const navigate = useNavigate();
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
    {
      id: 4,
      name: "SnowAce",
      status: "offline",
      lastOnline: "1 hrs ago",
      avatar: "avatar4.jpg",
    },
  ]);

  const [receivedInvites, setReceivedInvites] = useState([
    { id: 101, name: "alexzz12", avatar: "avatar7.jpg" },
    { id: 102, name: "bobtheghost", avatar: "avatar8.jpg" },
  ]);

  const [sentInvites, setSentInvites] = useState([]);
  const [viewPendingInvites, setViewPendingInvites] = useState(false);
  const [isViewingReceived, setIsViewingReceived] = useState(true);
  const [isAddFriendVisible, setIsAddFriendVisible] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [notification, setNotification] = useState("");

  const handleAddFriend = () => {
    if (!newFriendName.trim()) {
      setNotification("Name cannot be empty!");
      return;
    }

    const randomAvatar = `avatar${Math.floor(Math.random() * 11) + 1}.jpg`;

    setSentInvites((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newFriendName,
        avatar: randomAvatar,
      },
    ]);

    setNotification(`Friend request sent to ${newFriendName}!`);
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
      setNotification(`${invite.name} has been added to your friends list!`);
    }
  };

  const handleIgnoreInvite = (id) => {
    setReceivedInvites((prev) => prev.filter((i) => i.id !== id));
    setNotification("Invite ignored.");
  };

  const handleRemoveFriend = (id) => {
    const friend = friends.find((f) => f.id === id);
    if (friend) {
      setFriends((prev) => prev.filter((f) => f.id !== id));
      setNotification(`${friend.name} has been removed from your friends list.`);
    }
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
    <Body>
      {/* Navigation Bar */}
      <NavBar />

      {/* Header */}
      <Header>
        <ProfileSection>
          <Avatar src="avatar.jpg" alt="Profile" />
          <Username>khanhngan1491</Username>
        </ProfileSection>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Sidebar */}
        <Sidebar>
          <SectionTitle>FRIENDS</SectionTitle>
          <SidebarList>
            <SidebarItem onClick={() => setViewPendingInvites(false)}>
              Your Friends
            </SidebarItem>
            <SidebarItem onClick={() => setViewPendingInvites(true)}>
              Pending Invites
            </SidebarItem>
          </SidebarList>
        </Sidebar>

        {/* Friends Section */}
        <FriendsSection>
          <TopBar>
            <FriendsTitle>
              {viewPendingInvites
                ? "PENDING INVITES"
                : `YOUR FRIENDS ${friends.length} / 250`}
            </FriendsTitle>
            <AddFriendToggleButton
              onClick={() => setIsAddFriendVisible((prev) => !prev)}
            >
              {isAddFriendVisible ? "Cancel Add Friend" : "Add Friend"}
            </AddFriendToggleButton>
          </TopBar>

          {/* Add Friend Section */}
          {isAddFriendVisible && (
            <AddFriendSection>
              <AddFriendInput
                type="text"
                placeholder="Enter friend's name"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
              />
              <AddFriendButton onClick={handleAddFriend}>
                Confirm Add
              </AddFriendButton>
            </AddFriendSection>
          )}

          {/* Notification */}
          {notification && (
            <Notification>
              {notification}
              <CloseButton onClick={() => setNotification("")}>X</CloseButton>
            </Notification>
          )}

          {/* Pending Invites Section */}
          {viewPendingInvites && (
            <>
              <Tabs>
                <TabButton
                  active={isViewingReceived}
                  onClick={() => setIsViewingReceived(true)}
                >
                  Received Invites
                </TabButton>
                <TabButton
                  active={!isViewingReceived}
                  onClick={() => setIsViewingReceived(false)}
                >
                  Sent Invites
                </TabButton>
              </Tabs>
              <FriendsList>
                {isViewingReceived
                  ? filteredReceivedInvites.map((invite) => (
                      <FriendCard key={invite.id}>
                        <FriendAvatar src={invite.avatar} alt={invite.name} />
                        <FriendInfo>
                          <FriendName>{invite.name}</FriendName>
                          <InviteActions>
                            <AcceptButton
                              onClick={() => handleAcceptInvite(invite.id)}
                            >
                              Accept
                            </AcceptButton>
                            <IgnoreButton
                              onClick={() => handleIgnoreInvite(invite.id)}
                            >
                              Ignore
                            </IgnoreButton>
                          </InviteActions>
                        </FriendInfo>
                      </FriendCard>
                    ))
                  : filteredSentInvites.map((invite) => (
                      <FriendCard key={invite.id}>
                        <FriendAvatar src={invite.avatar} alt={invite.name} />
                        <FriendInfo>
                          <FriendName>{invite.name}</FriendName>
                          <StatusText>Invite Sent</StatusText>
                        </FriendInfo>
                      </FriendCard>
                    ))}
              </FriendsList>
            </>
          )}

          {/* Friends List */}
          {!viewPendingInvites && (
            <FriendsList>
              {filteredFriends.map((friend) => (
                <FriendCard key={friend.id}>
                  <FriendAvatar src={friend.avatar} alt={friend.name} />
                  <FriendInfo>
                    <FriendName>{friend.name}</FriendName>
                    <LastOnline>Last Online {friend.lastOnline}</LastOnline>
                  </FriendInfo>
                  <DeleteIcon onClick={() => handleRemoveFriend(friend.id)}>
                    <Trash2 color="#ff4d4f" />
                  </DeleteIcon>
                </FriendCard>
              ))}
              {filteredFriends.length === 0 && (
                <NoFriendsMessage>No friends found.</NoFriendsMessage>
              )}
            </FriendsList>
          )}
        </FriendsSection>
      </MainContent>
    </Body>
  );
};

// Styled-components

const Body = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  background-color: #171a21;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #3a4756;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgb(199, 90, 246);
`;

const Username = styled.h1`
  font-size: 24px;
  color: rgb(199, 90, 246);
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: #2a2a3d;
  padding: 20px;
  border-right: 2px solidrgb(42, 42, 64);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid rgb(199, 90, 246);
  }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  color: rgb(199, 90, 246);
  margin-bottom: 10px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  color:rgb(255, 255, 255);
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const FriendsSection = styled.section`
  flex-grow: 1;
  background-color: #2a2a3d;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FriendsTitle = styled.h2`
  font-size: 22px;
  color: #ffffff;
`;

const AddFriendToggleButton = styled.button`
  padding: 10px 15px;
  background-color: #c759f6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #b850e4;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(162, 68, 202, 0.7);
  }
`;

const AddFriendSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const AddFriendInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 2px solidrgb(199, 89, 246);
  background-color: #1e1e2e;
  color:rgb(255, 255, 255);
  font-size: 14px;

  ::placeholder {
    color: rgb(199, 90, 246);
  }
`;

const AddFriendButton = styled.button`
  padding: 10px 15px;
  background-color: rgb(199, 90, 246);
  color:rgb(255, 255, 255);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const Notification = styled.div`
  background-color: rgb(199, 90, 246);
  color:rgb(255, 255, 255);
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color:rgb(255, 255, 255);
  cursor: pointer;
  font-size: 16px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 15px;
  background-color: ${(props) => (props.active ? "rgb(199, 90, 246)" : "#171a21")};
  color:rgb(255, 255, 255);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const FriendsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const FriendCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #1e1e2e;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(162, 68, 202, 0.4);
  }
`;

const FriendAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FriendName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
`;

const LastOnline = styled.p`
  font-size: 14px;
  color: #a9a9a9;
  margin: 5px 0 0 0;
`;

const StatusText = styled.p`
  font-size: 14px;
  color: #a9a9a9;
  margin: 5px 0 0 0;
`;

const InviteActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
`;

const AcceptButton = styled.button`
  padding: 5px 10px;
  background-color:rgb(199, 90, 246);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const IgnoreButton = styled.button`
  padding: 5px 10px;
  background-color:rgb(199, 90, 246);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  right: 5px;
  top: 25%;
  transform: translateY(-50%);
  cursor: pointer;

  &:hover {
    color: #ff4d4f;
  }
`;

const NoFriendsMessage = styled.p`
  text-align: center;
  color: #a9a9a9;
  grid-column: 1 / -1;
`;

// Exporting the component
export default FriendsPage;
