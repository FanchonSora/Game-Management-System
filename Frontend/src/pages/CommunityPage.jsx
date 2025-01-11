// File: src/pages/CommunityPage.jsx

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";

// Keyframes for Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e; /* Nền tối */
  color: #c7d5e0; /* Màu chữ sáng */
  min-height: 100vh;
  padding: 120px 20px 20px 20px; /* Đảm bảo không bị Navbar che */
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #a9a9a9;
`;

const HubsSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const HubContainer = styled.div`
  flex: 1;
  min-width: 250px;
  background-color: #2a2a3d; /* Đổi màu nền sang màu tối */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const HubTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
`;

const HubItem = styled.p`
  margin: 0;
  margin-bottom: 10px;
  color: #c7d5e0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const HubActivity = styled.span`
  color:rgb(199, 102, 244);
`;

const SearchSection = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #0f1c2c; /* Đổi màu nền sang màu tối */
  color: #c7d5e0;
  font-size: 1rem;
  &::placeholder {
    color: #a9a9a9;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgb(130, 36, 180);
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 10px;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? "rgb(184, 81, 228)" : "rgb(105, 37, 134)")};
  color: ${(props) => (props.active ? "#fff" : "#c7d5e0")};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: rgb(184, 81, 228);
    color: #fff;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const Section = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #2a2a3d; /* Đổi màu nền sang màu tối */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
`;

const SectionContent = styled.p`
  color:rgb(140, 76, 219);  
  margin: 0;
`;

const PostSection = styled.div`
  margin-top: 30px;
  background-color: #2a2a3d; /* Đổi màu nền sang màu tối */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostInput = styled.textarea`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  resize: vertical;
  min-height: 80px;
  background-color: #0f1c2c; /* Đổi màu nền sang màu tối */
  color: #c7d5e0;
  font-size: 1rem;
  &::placeholder {
    color: #a9a9a9;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgb(211, 102, 244);
  }
`;

const PostButton = styled.button`
  align-self: flex-end;
  background-color: rgb(199, 90, 246); /* Màu nền nút giống HomePage.jsx */
  color: #fff; /* Màu chữ trắng */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s, box-shadow 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const PostList = styled.div`
  margin-top: 20px;
`;

const PostItem = styled.div`
  background-color: #1f1f2e; /* Đổi màu nền sang màu tối hơn */
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #c7d5e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchProduct, setSearchProduct] = useState("");
  const [searchFriend, setSearchFriend] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const recentlyViewedHubs = [
    { id: 1, name: "Cube Racer", activity: "10 new screenshots this week" },
    { id: 2, name: "Galaxy Quest", activity: "5 new guides this week" },
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

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;
    const post = {
      id: Date.now(),
      content: newPost.trim(),
      date: new Date().toLocaleString(),
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <Container>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Header Section */}
      <Header>
        <Title>Community Activity</Title>
        <Subtitle>Community and official content for all games and software on Steam.</Subtitle>
      </Header>

      {/* Hubs Section */}
      <HubsSection>
        {/* Recently Viewed Hubs */}
        <HubContainer>
          <HubTitle>Your Recently Viewed Hubs</HubTitle>
          {recentlyViewedHubs.map((hub) => (
            <HubItem key={hub.id}>
              {hub.name} - <HubActivity>{hub.activity}</HubActivity>
            </HubItem>
          ))}
        </HubContainer>

        {/* Popular Hubs */}
        <HubContainer>
          <HubTitle>Popular Hubs</HubTitle>
          {popularHubs.map((hub) => (
            <HubItem key={hub.id}>
              {hub.name} - <HubActivity>{hub.activity}</HubActivity>
            </HubItem>
          ))}
        </HubContainer>

        {/* Search Section */}
        <SearchSection>
          <SearchInput
            type="text"
            placeholder="Search for products"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <SearchInput
            type="text"
            placeholder="Search for friends"
            value={searchFriend}
            onChange={(e) => setSearchFriend(e.target.value)}
          />
        </SearchSection>
      </HubsSection>

      {/* Content Section */}
      <Content>
        {/* Recommended Reviews */}
        <Section>
          <SectionTitle>Recommended</SectionTitle>
          <SectionContent>
            10 years later and it got online multiplayer. Never kill yourself.
          </SectionContent>
        </Section>

        {/* Guides */}
        <Section>
          <SectionTitle>S.T.A.L.K.E.R. 2: Heart of Chornobyl: Guide</SectionTitle>
          <SectionContent>
            How to upgrade your DLSS version of any game
          </SectionContent>
        </Section>
      </Content>

      {/* Post Section */}
      <PostSection>
        <h3 className="text-xl font-bold mb-4">Share Your Thoughts</h3>
        <PostForm onSubmit={handlePostSubmit}>
          <PostInput
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <PostButton type="submit">Post</PostButton>
        </PostForm>

        <PostList>
          {posts.map((post) => (
            <PostItem key={post.id}>
              <p>{post.content}</p>
              <small>{post.date}</small>
            </PostItem>
          ))}
        </PostList>
      </PostSection>
    </Container>
  );
};

export default CommunityPage;
