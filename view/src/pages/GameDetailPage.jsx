// src/components/GameDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import gameData from "../data/gameData"; 

// Keyframes for Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components

// Container
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

// Content Wrapper
const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Navbar Styled Components
const Navbar = styled.nav`
  width: 100%;
  background-color: #2d333b;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

// Dropdown Components
const Dropdown = styled.div`
  position: relative;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #c7d5e0;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 38px;
  left: 0;
  background-color: rgba(42, 71, 94, 0.95);
  border-radius: 5px;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 100;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #c7d5e0;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NavLinkStyled = styled(Link)`
  color: #c7d5e0;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

// Game Detail Section
const GameDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  animation: ${fadeIn} 1s ease-out;
`;

// Game Header
const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

// Game Image Wrapper
const GameImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

// Game Image
const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Game Title
const GameTitle = styled.h1`
  font-size: 32px;
  color: #24292e;
`;

// Buttons
const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

// Play Button
const PlayButton = styled.button`
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(231, 76, 60, 0.5);

  &:hover {
    background-color: #c0392b;
  }
`;

// Back Button
const BackButton = styled(Link)`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(46, 204, 113, 0.5);

  &:hover {
    background-color: #28b54a;
  }
`;

// Tags
const Tags = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #3498db;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

// Game Information
const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoTitle = styled.span`
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const InfoText = styled.span`
  color: #34495e;
`;

// Description
const DescriptionBox = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #2c3e50;
`;

// Screenshots
const Screenshots = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const Screenshot = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

// Featured Games Section
const FeaturedGamesSection = styled.div`
  margin-top: 40px;
`;

const FeaturedGamesTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

// Categorized Games Section
const CategorizedGamesSection = styled.div`
  margin-top: 40px;
`;

const CategorizedGamesTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

// Games Grid
const GamesGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

// Back to Top Button (optional)
const BackToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #3498db;
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: background 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);

  useEffect(() => {
    const foundGame = gameData.find((item) => item.id === parseInt(id));
    if (foundGame) {
      setGame(foundGame);
    } else {
      // Redirect to Library page if game not found
      navigate("/library-game");
    }
  }, [id, navigate]);

  const handlePlay = () => {
    // Implement play functionality, e.g., redirect to game URL or start the game
    alert("Starting the game...");
  };

  return (
    <Container>
      <ContentWrapper>
        <Navbar>
          <NavLinks>
            {/* Market Dropdown */}
            <Dropdown>
              <NavButton
                onClick={() => {
                  // Toggle Dropdown Logic (if needed)
                }}
                aria-haspopup="true"
                aria-expanded="false"
              >
                Market
              </NavButton>
              {/* Add DropdownMenu if needed */}
            </Dropdown>

            {/* Community Link */}
            <NavLinkStyled to="/community">Community</NavLinkStyled>

            {/* Library Dropdown */}
            <Dropdown>
              <NavButton
                onClick={() => {
                  // Toggle Dropdown Logic (if needed)
                }}
                aria-haspopup="true"
                aria-expanded="false"
              >
                Library
              </NavButton>
              {/* Add DropdownMenu if needed */}
            </Dropdown>

            {/* Profile Dropdown */}
            <Dropdown>
              <NavButton
                onClick={() => {
                  // Toggle Dropdown Logic (if needed)
                }}
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </NavButton>
              {/* Add DropdownMenu if needed */}
            </Dropdown>
          </NavLinks>
        </Navbar>

        {/* Game Detail Section */}
        {game && (
          <GameDetailContainer>
            <GameHeader>
              <GameImageWrapper>
                <GameImage src={game.image} alt={game.title} />
              </GameImageWrapper>
              <GameTitle>{game.title}</GameTitle>
              <Buttons>
                <PlayButton onClick={handlePlay}>Play Now</PlayButton>
                <BackButton to="/library-game">Back to Library</BackButton>
              </Buttons>
            </GameHeader>

            {/* Tags */}
            <Tags>
              {game.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>

            {/* Game Information */}
            <InfoBox>
              <InfoItem>
                <InfoTitle>Genre</InfoTitle>
                <InfoText>{game.genre}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Developer</InfoTitle>
                <InfoText>{game.developer}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Release Date</InfoTitle>
                <InfoText>{game.releaseDate}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Rating</InfoTitle>
                <InfoText>{game.rating}</InfoText>
              </InfoItem>
            </InfoBox>

            {/* Description */}
            <DescriptionBox>
              <SectionTitle>About This Game</SectionTitle>
              <DescriptionText>{game.description}</DescriptionText>
            </DescriptionBox>

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div>
                <SectionTitle>Screenshots</SectionTitle>
                <Screenshots>
                  {game.screenshots.map((shot, index) => (
                    <Screenshot
                      key={index}
                      src={shot}
                      alt={`${game.title} Screenshot ${index + 1}`}
                    />
                  ))}
                </Screenshots>
              </div>
            )}

            {/* Featured Games Section */}
            <FeaturedGamesSection>
              <FeaturedGamesTitle>Featured Games</FeaturedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter((featuredGame) => featuredGame.tags.includes("Featured") && featuredGame.id !== game.id)
                  .map((featuredGame) => (
                    <Card
                      key={featuredGame.id}
                      image={featuredGame.image}
                      title={featuredGame.title}
                      description={`Price: ${featuredGame.price}`}
                      tags={featuredGame.tags}
                      buttonText="View Detail"
                      buttonLink={`/market-game/${featuredGame.id}`}
                      isFree={featuredGame.price === 'Free'}
                      onAddToLibrary={() => {
                        if (featuredGame.price === 'Free') {
                          const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
                          if (!storedGames.find((g) => g.id === featuredGame.id)) {
                            storedGames.push({ id: featuredGame.id, name: featuredGame.title });
                            localStorage.setItem('libraryGames', JSON.stringify(storedGames));
                            alert(`${featuredGame.title} has been added to your Library!`);
                          } else {
                            alert(`${featuredGame.title} is already in your Library.`);
                          }
                        } else {
                          alert(`Cannot add ${featuredGame.title} to your Library. This game is not free.`);
                        }
                      }}
                      maxWidth="300px"
                      height="150px"
                    />
                  ))}
              </GamesGridStyled>
            </FeaturedGamesSection>

            {/* Massively Multiplayer Games Section */}
            <CategorizedGamesSection>
              <CategorizedGamesTitle>Massively Multiplayer Games</CategorizedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter((mmGame) => mmGame.tags.includes("MMO") && mmGame.id !== game.id)
                  .map((mmGame) => (
                    <Card
                      key={mmGame.id}
                      image={mmGame.image}
                      title={mmGame.title}
                      description={`Price: ${mmGame.price} ${mmGame.discount ? `(${mmGame.discount})` : ""}`}
                      tags={mmGame.tags}
                      buttonText="View Detail"
                      buttonLink={`/market-game/${mmGame.id}`}
                      isFree={mmGame.price === 'Free'}
                      onAddToLibrary={() => {
                        if (mmGame.price === 'Free') {
                          const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
                          if (!storedGames.find((g) => g.id === mmGame.id)) {
                            storedGames.push({ id: mmGame.id, name: mmGame.title });
                            localStorage.setItem('libraryGames', JSON.stringify(storedGames));
                            alert(`${mmGame.title} has been added to your Library!`);
                          } else {
                            alert(`${mmGame.title} is already in your Library.`);
                          }
                        } else {
                          alert(`Cannot add ${mmGame.title} to your Library. This game is not free.`);
                        }
                      }}
                      maxWidth="300px"
                      height="150px"
                    />
                  ))}
              </GamesGridStyled>
            </CategorizedGamesSection>

            {/* Casual Games Section */}
            <CategorizedGamesSection>
              <CategorizedGamesTitle>Casual Games</CategorizedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter((casualGame) => casualGame.tags.includes("Casual") && casualGame.id !== game.id)
                  .map((casualGame) => (
                    <Card
                      key={casualGame.id}
                      image={casualGame.image}
                      title={casualGame.title}
                      description={`Price: ${casualGame.price} ${casualGame.discount ? `(${casualGame.discount})` : ""}`}
                      tags={casualGame.tags}
                      buttonText="View Detail"
                      buttonLink={`/market-game/${casualGame.id}`}
                      isFree={casualGame.price === 'Free'}
                      onAddToLibrary={() => {
                        if (casualGame.price === 'Free') {
                          const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
                          if (!storedGames.find((g) => g.id === casualGame.id)) {
                            storedGames.push({ id: casualGame.id, name: casualGame.title });
                            localStorage.setItem('libraryGames', JSON.stringify(storedGames));
                            alert(`${casualGame.title} has been added to your Library!`);
                          } else {
                            alert(`${casualGame.title} is already in your Library.`);
                          }
                        } else {
                          alert(`Cannot add ${casualGame.title} to your Library. This game is not free.`);
                        }
                      }}
                      maxWidth="300px"
                      height="150px"
                    />
                  ))}
              </GamesGridStyled>
            </CategorizedGamesSection>
          </GameDetailContainer>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default GameDetailPage;
