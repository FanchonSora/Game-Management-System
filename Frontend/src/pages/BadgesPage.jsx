// File: src/pages/BadgesPage.jsx

import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/Navbar";

const BadgesPage = () => {
  const [sortOption, setSortOption] = useState("A-Z");
  const [badges, setBadges] = useState([
    {
      id: 1,
      title: "Summer Sale 2024",
      level: 1,
      xp: 100,
      description: "0 of 10 cards collected",
      tasksRemaining: "No card drops remaining",
      rarity: "Common",
      cards: ["card-placeholder1.jpg"],
      completed: false,
    },
    {
      id: 2,
      title: "Pillar of Community",
      level: 1,
      xp: 0,
      description: "7 of 28 tasks completed",
      tasksRemaining: "21 tasks remaining",
      rarity: "Rare",
      cards: ["card-placeholder2.jpg"],
      completed: false,
    },
    {
      id: 3,
      title: "Steam Awards Nomination Committee 2024",
      level: 0,
      xp: 0,
      description: "0 of 4 tasks completed",
      tasksRemaining: "4 tasks remaining",
      rarity: "Epic",
      cards: [],
      completed: false,
    },
    // Add more badges as needed
  ]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedBadges = [...badges].sort((a, b) => {
    switch (sortOption) {
      case "A-Z":
        return a.title.localeCompare(b.title);
      case "Completed":
        return b.completed - a.completed; // Completed first
      case "Rarity":
        const rarityOrder = { Common: 1, Rare: 2, Epic: 3, Legendary: 4 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });

  const toggleCompletion = (id) => {
    setBadges((prevBadges) =>
      prevBadges.map((badge) =>
        badge.id === id ? { ...badge, completed: !badge.completed } : badge
      )
    );
  };

  return (
    <Container>
      {/* Navigation Bar */}
      <NavBar />

      {/* Header */}
      <Header>
        <ProfileSection>
          <Avatar src="avatar.jpg" alt="User Avatar" />
          <UserInfo>
            <Username>khanhngan1491</Username>
            <UserLevel>Level 100 | XP 2409</UserLevel>
          </UserInfo>
        </ProfileSection>
      </Header>

      {/* Filter & Sort Section */}
      <FilterSortSection>
        <SortLabel>Sort By:</SortLabel>
        <SortSelect
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="A-Z">A - Z</option>
          <option value="Completed">Completed</option>
          <option value="Rarity">Rarity</option>
        </SortSelect>
      </FilterSortSection>

      {/* Badge List */}
      <BadgeGrid>
        {sortedBadges.map((badge) => (
          <BadgeCard key={badge.id}>
            <BadgeHeader>
              <BadgeDetails>
                <BadgeTitle>{badge.title}</BadgeTitle>
                <BadgeLevel>
                  Level {badge.level} - {badge.xp} XP
                </BadgeLevel>
                <BadgeDescription>{badge.description}</BadgeDescription>
                <BadgeTasks>{badge.tasksRemaining}</BadgeTasks>
                <BadgeRarity>Rarity: {badge.rarity}</BadgeRarity>
              </BadgeDetails>
              <BadgeIcon>🏆</BadgeIcon>
            </BadgeHeader>
            {badge.cards.length > 0 && (
              <CardContainer>
                {badge.cards.map((card, index) => (
                  <CardImage key={index} src={card} alt="Card" />
                ))}
              </CardContainer>
            )}
            <CompletionToggle>
              <label>
                <input
                  type="checkbox"
                  checked={badge.completed}
                  onChange={() => toggleCompletion(badge.id)}
                />
                Completed
              </label>
            </CompletionToggle>
          </BadgeCard>
        ))}
      </BadgeGrid>
    </Container>
  );
};

export default BadgesPage;

// Styled-components

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background: #2a2a3d;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  margin-top: 2rem;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgb(199, 90, 246);
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h1`
  font-size: 24px;
  color: #c75af6;
  margin: 0;
`;

const UserLevel = styled.p`
  font-size: 16px;
  color:rgb(255, 255, 255);
  margin: 5px 0 0 0;
`;

const FilterSortSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

const SortLabel = styled.label`
  font-size: 16px;
  color: #c7d5e0;
`;

const SortSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid #c75af6;
  border-radius: 5px;
  background-color:  #2a2a3d;
  color:rgb(255, 255, 255);
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #b850e4;
  }
`;

const BadgeGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const BadgeCard = styled.div`
  background: #2a2a3d;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgb(199, 90, 246);
  }
`;

const BadgeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const BadgeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BadgeTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #ffffff;
`;

const BadgeLevel = styled.p`
  font-size: 14px;
  color: rgb(199, 90, 246);
  margin: 5px 0 0 0;
`;

const BadgeDescription = styled.p`
  font-size: 14px;
  color:rgb(255, 255, 255);
  margin: 5px 0 0 0;
`;

const BadgeTasks = styled.p`
  font-size: 14px;
  color: rgb(199, 90, 246);
  margin: 5px 0 0 0;
`;

const BadgeRarity = styled.p`
  font-size: 14px;
  color:rgb(255, 255, 255);
  margin: 5px 0 0 0;
`;

const BadgeIcon = styled.div`
  font-size: 45px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const CardImage = styled.img`
  width: 60px;
  height: 90px;
  border-radius: 5px;
  object-fit: cover;
`;

const CompletionToggle = styled.div`
  margin-top: 15px;

  label {
    font-size: 14px;
    color:rgb(255, 255, 255);
    cursor: pointer;
    display: flex;
    align-items: center;

    input {
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;
