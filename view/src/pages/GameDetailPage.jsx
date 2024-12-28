// src/pages/GameDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import gameData from "../data/gameData"; 
import Card from "../components/GameCard"; // Đảm bảo bạn có component Card
import Navbar from "../components/Navbar"; // Import Navbar component

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
  padding: 120px 20px 20px 20px; /* Adjust padding to account for fixed Navbar */
  position: relative;
  overflow: hidden;
`;

// Content Wrapper
const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// SectionTitle
const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
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

// Add to Library Button
const AddButton = styled.button`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #27ae60;
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  }
`;

// Purchase Button
const PurchaseButton = styled.button`
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #c0392b;
    box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
  }
`;

// Back Button
const BackButton = styled(Link)`
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #2980b9;
    box-shadow: 0 4px 12px rgba(41, 128, 185, 0.3);
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

const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);

  useEffect(() => {
    const numericId = Number(id);
    console.log("Searching for game with id:", numericId);
    if (isNaN(numericId)) {
      alert("Invalid game ID.");
      navigate("/library-game");
      return;
    }
    const foundGame = gameData.find((item) => item.id === numericId);
    console.log("Found game:", foundGame);
    if (foundGame) {
      setGame(foundGame);
    } else {
      // Redirect to Library page if game not found
      alert("Game not found. Redirecting to Library.");
      navigate("/library-game");
    }
  }, [id, navigate]);

  // Add to library function
  const handleAddToLibrary = () => {
    if (game.price === 'Free') {
      const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
      // Thêm trò chơi mới nếu chưa có
      if (!storedGames.find((g) => g.id === game.id)) {
        storedGames.push({ id: game.id, name: game.title });
        localStorage.setItem('libraryGames', JSON.stringify(storedGames));
        // logActivity('add', game); // Nếu bạn có hàm này, hãy dùng hoặc bỏ dòng này
        alert(`${game.title} đã được thêm vào Thư viện của bạn!`);
      } else {
        alert(`${game.title} đã có trong Thư viện của bạn.`);
      }
    }
  };

  // Purchase function
  const handlePurchase = () => {
    // Implement purchase functionality here, e.g., redirect to payment gateway
    // For demo purposes, we'll just show an alert
    alert(`Bạn đã chọn mua ${game.title} với giá ${game.price}.`);
    // Sau khi mua thành công, bạn có thể thêm game vào thư viện hoặc thực hiện các bước tiếp theo
  };

  return (
    <Container>
      <Navbar /> {/* Sử dụng component Navbar từ src/components/Navbar.jsx */}

      <ContentWrapper>
        {/* Game Detail Section */}
        {game ? (
          <GameDetailContainer>
            <GameHeader>
              <GameImageWrapper>
                <GameImage src={game.image} alt={game.title} />
              </GameImageWrapper>
              <GameTitle>{game.title}</GameTitle>
              <Buttons>
                {game.price === 'Free' ? (
                  <AddButton onClick={handleAddToLibrary}>Add to Library</AddButton>
                ) : (
                  <PurchaseButton onClick={handlePurchase}>Purchase</PurchaseButton>
                )}
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
                  .filter(
                    (featuredGame) =>
                      featuredGame.tags.includes("Featured") &&
                      featuredGame.id !== game.id
                  )
                  .map((featuredGame) => (
                    <Card
                      key={featuredGame.id}
                      image={featuredGame.image}
                      title={featuredGame.title}
                      description={`Price: ${featuredGame.price}`}
                      tags={featuredGame.tags}
                      buttonText="View Detail"
                      buttonLink={`/market-game/${featuredGame.id}`}
                      isFree={featuredGame.price === "Free"}
                      onAddToLibrary={() => {
                        if (featuredGame.price === "Free") {
                          const storedGames =
                            JSON.parse(localStorage.getItem("libraryGames")) ||
                            [];
                          if (
                            !storedGames.find(
                              (g) => g.id === featuredGame.id
                            )
                          ) {
                            storedGames.push({
                              id: featuredGame.id,
                              name: featuredGame.title,
                            });
                            localStorage.setItem(
                              "libraryGames",
                              JSON.stringify(storedGames)
                            );
                            alert(
                              `${featuredGame.title} đã được thêm vào Thư viện của bạn!`
                            );
                          } else {
                            alert(
                              `${featuredGame.title} đã có trong Thư viện của bạn.`
                            );
                          }
                        } else {
                          alert(
                            `Không thể thêm ${featuredGame.title} vào Thư viện. Trò chơi này không miễn phí.`
                          );
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
              <CategorizedGamesTitle>
                Massively Multiplayer Games
              </CategorizedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter(
                    (mmGame) =>
                      mmGame.tags.includes("MMO") && mmGame.id !== game.id
                  )
                  .map((mmGame) => (
                    <Card
                      key={mmGame.id}
                      image={mmGame.image}
                      title={mmGame.title}
                      description={`Price: ${mmGame.price} ${
                        mmGame.discount ? `(${mmGame.discount})` : ""
                      }`}
                      tags={mmGame.tags}
                      buttonText="View Detail"
                      buttonLink={`/market-game/${mmGame.id}`}
                      isFree={mmGame.price === "Free"}
                      onAddToLibrary={() => {
                        if (mmGame.price === "Free") {
                          const storedGames =
                            JSON.parse(localStorage.getItem("libraryGames")) ||
                            [];
                          if (
                            !storedGames.find((g) => g.id === mmGame.id)
                          ) {
                            storedGames.push({
                              id: mmGame.id,
                              name: mmGame.title,
                            });
                            localStorage.setItem(
                              "libraryGames",
                              JSON.stringify(storedGames)
                            );
                            alert(
                              `${mmGame.title} đã được thêm vào Thư viện của bạn!`
                            );
                          } else {
                            alert(
                              `${mmGame.title} đã có trong Thư viện của bạn.`
                            );
                          }
                        } else {
                          alert(
                            `Không thể thêm ${mmGame.title} vào Thư viện. Trò chơi này không miễn phí.`
                          );
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
                  .filter(
                    (casualGame) =>
                      casualGame.tags.includes("Casual") &&
                      casualGame.id !== game.id
                  )
                  .map((casualGame) => (
                    <Card
                      key={casualGame.id}
                      image={casualGame.image}
                      title={casualGame.title}
                      description={`Price: ${casualGame.price} ${
                        casualGame.discount ? `(${casualGame.discount})` : ""
                      }`}
                      tags={casualGame.tags}
                      buttonText="View Detail"
                      buttonLink={`/market-game/${casualGame.id}`}
                      isFree={casualGame.price === "Free"}
                      onAddToLibrary={() => {
                        if (casualGame.price === "Free") {
                          const storedGames =
                            JSON.parse(localStorage.getItem("libraryGames")) ||
                            [];
                          if (
                            !storedGames.find((g) => g.id === casualGame.id)
                          ) {
                            storedGames.push({
                              id: casualGame.id,
                              name: casualGame.title,
                            });
                            localStorage.setItem(
                              "libraryGames",
                              JSON.stringify(storedGames)
                            );
                            alert(
                              `${casualGame.title} đã được thêm vào Thư viện của bạn!`
                            );
                          } else {
                            alert(
                              `${casualGame.title} đã có trong Thư viện của bạn.`
                            );
                          }
                        } else {
                          alert(
                            `Không thể thêm ${casualGame.title} vào Thư viện. Trò chơi này không miễn phí.`
                          );
                        }
                      }}
                      maxWidth="300px"
                      height="150px"
                    />
                  ))}
              </GamesGridStyled>
            </CategorizedGamesSection>
          </GameDetailContainer>
        ) : (
          <div>Loading game details...</div>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default GameDetailPage;
