import React from "react";
import { useParams } from "react-router-dom"; // Get dynamic params
import styled, { keyframes } from "styled-components";

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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
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

// Content Section Styles
const Content = styled.div`
  padding: 20px;
  background-color: rgba(21, 32, 43, 0.8);
  margin: 20px auto;
  max-width: 800px;
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

// Modes Container Styles
const Modes = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

// Styled Button with Animations and Hover Effects
const ModeButton = styled.button`
  padding: 15px 30px;
  background-color: #66c0f4;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    background-color: #558bbd;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(85, 139, 189, 0.4);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(85, 139, 189, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 192, 244, 0.5);
  }
`;

// Icon for Buttons (Optional)
const ButtonIcon = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;

// Example SVG Icon (you can replace it with any icon you like)
const PlayIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 3.5L16 10L4 16.5V3.5Z" />
  </svg>
);

// GameModePage Component
const GameModePage = () => {
  const { id } = useParams(); // Extract the game ID from the URL

  const games = {
    1: "Bro Falls: Ultimate Showdown",
    2: "Business Tour",
    3: "Counter-Strike 2",
    4: "Cube Racer",
    5: "Goose Goose Duck",
    6: "One-armed Cook",
    7: "Poppy Playtime",
    8: "TOXIKK",
  };

  const gameTitle = games[id];

  return (
    <Container>
      {/* Header */}
      <Header>
        <GameTitle>{gameTitle}</GameTitle>
      </Header>

      {/* Main Content */}
      <Content>
        <Subtitle>Choose Game Mode</Subtitle>
        <Modes>
          <ModeButton>
            <ButtonIcon>
              <PlayIcon />
            </ButtonIcon>
            Single Player
          </ModeButton>
          <ModeButton>
            <ButtonIcon>
              <PlayIcon />
            </ButtonIcon>
            Multiplayer
          </ModeButton>
          <ModeButton>
            <ButtonIcon>
              <PlayIcon />
            </ButtonIcon>
            Custom Mode
          </ModeButton>
        </Modes>
      </Content>
    </Container>
  );
};

export default GameModePage;
