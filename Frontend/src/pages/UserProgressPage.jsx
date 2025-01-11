// src/components/UserProgressPage.jsx

import React from "react";
import { useParams } from "react-router-dom"; // Get dynamic params
import styled, { keyframes } from "styled-components";
import gameData from "../data/libraryGames"; // Import the local data

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

// Container with Background Image and Overlay
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1b2838;
  background-image: url('https://i.imgur.com/your-background-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 2rem;
  color: #c7d5e0;
  animation: ${fadeIn} 1s ease-out;
  position: relative;

  /* Overlay for better text readability */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  /* Ensure content is above the overlay */
  > * {
    position: relative;
    z-index: 1;
  }
`;

// Header Styles
const Header = styled.div`
  padding: 40px 20px 20px 20px;
  text-align: center;
  background-color: rgba(21, 32, 43, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
`;

// Game Title Styles
const GameTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

// Main Content Section Styles
const Content = styled.div`
  padding: 20px;
  background-color: rgba(21, 32, 43, 0.8);
  margin: 20px auto;
  max-width: 900px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
`;

// Subtitle Styles
const Subtitle = styled.h2`
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

// Progress Section Styles
const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// Individual Progress Item Styles
const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Label for Progress Items
const ProgressLabel = styled.span`
  font-size: 20px;
  color: #c7d5e0;
`;

// Progress Bar Container
const ProgressBarContainer = styled.div`
  width: 60%;
  background-color: #2c3e50;
  border-radius: 8px;
  overflow: hidden;
`;

// Progress Bar Fill
const ProgressBarFill = styled.div`
  height: 20px;
  background-color: #66c0f4;
  width: ${(props) => props.percentage}%;
  transition: width 0.5s ease-in-out;
`;

// Achievements Section Styles
const AchievementsSection = styled.div`
  margin-top: 40px;
`;

// Achievements Grid
const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

// Individual Achievement Card
const AchievementCard = styled.div`
  background-color: rgba(21, 32, 43, 0.9);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    background-color: rgba(21, 32, 43, 1);
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

// Achievement Icon (Optional)
const AchievementIcon = styled.div`
  margin-bottom: 10px;
`;

// Example SVG Icon (you can replace it with any icon you like)
const TrophyIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="#FFD700"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 2H6C4.89 2 4 2.89 4 4V8C4 9.1 4.89 10 6 10H7V19C7 20.1 7.9 21 9 21H15C16.1 21 17 20.1 17 19V10H18C19.1 10 20 9.1 20 8V4C20 2.89 19.1 2 18 2ZM9 19V10H15V19H9ZM6 4H18V8H6V4Z" />
  </svg>
);

// UserProgressPage Component
const UserProgressPage = () => {
  const { id } = useParams(); // Extract the game ID from the URL

  const game = gameData[id];

  if (!game) {
    return (
      <Container>
        <Header>
          <GameTitle>Unknown Game</GameTitle>
        </Header>
        <Content>
          <Subtitle>Game not found.</Subtitle>
        </Content>
      </Container>
    );
  }

  const { title, progress, achievements } = game;

  return (
    <Container>
      {/* Header */}
      <Header>
        <GameTitle>{title}</GameTitle>
      </Header>

      {/* Main Content */}
      <Content>
        <Subtitle>Your Progress</Subtitle>
        <ProgressSection>
          {/* Level Achieved */}
          <ProgressItem>
            <ProgressLabel>Level Achieved</ProgressLabel>
            <ProgressBarContainer>
              <ProgressBarFill percentage={progress.levelPercentage}>
                {/* Optional: You can add text inside the progress bar */}
              </ProgressBarFill>
            </ProgressBarContainer>
          </ProgressItem>

          {/* Experience Points */}
          <ProgressItem>
            <ProgressLabel>Experience Points</ProgressLabel>
            <ProgressBarContainer>
              <ProgressBarFill percentage={progress.expPercentage}>
                {/* Optional: You can add text inside the progress bar */}
              </ProgressBarFill>
            </ProgressBarContainer>
          </ProgressItem>

          {/* Achievements Unlocked */}
          <ProgressItem>
            <ProgressLabel>Achievements Unlocked</ProgressLabel>
            <ProgressBarContainer>
              <ProgressBarFill percentage={progress.achievementsPercentage}>
                {/* Optional: You can add text inside the progress bar */}
              </ProgressBarFill>
            </ProgressBarContainer>
          </ProgressItem>
        </ProgressSection>

        {/* Achievements Section */}
        <AchievementsSection>
          <Subtitle>Achievements</Subtitle>
          {achievements.length === 0 ? (
            <p style={{ textAlign: "center", color: "#c7d5e0" }}>
              No achievements unlocked yet. Keep playing to earn achievements!
            </p>
          ) : (
            <AchievementsGrid>
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id}>
                  <AchievementIcon>
                    {/* You can use different icons based on achievement type */}
                    <TrophyIcon />
                  </AchievementIcon>
                  <div>{achievement.name}</div>
                </AchievementCard>
              ))}
            </AchievementsGrid>
          )}
        </AchievementsSection>
      </Content>
    </Container>
  );
};

export default UserProgressPage;
