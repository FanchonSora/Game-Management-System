// src/pages/LibraryGameDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import gameData from "../../data/gameData"; // Dùng để hiển thị Featured Games
import Card from "../../components/GameCard";
import Navbar from "../../components/Navbar";

// Keyframes for Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 120px 20px 20px 20px; 
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

const GameDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  animation: ${fadeIn} 1s ease-out;
`;

const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const GameImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GameTitle = styled.h1`
  font-size: 32px;
  color: #24292e;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

// Remove from Library Button
const RemoveButton = styled.button`
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

const DescriptionBox = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #2c3e50;
`;

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

const FeaturedGamesSection = styled.div`
  margin-top: 40px;
`;

const FeaturedGamesTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

const GamesGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const LibraryGameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      alert("ID game không hợp lệ.");
      navigate("/library");
      return;
    }

    // Lấy danh sách game từ localStorage
    const storedGames = JSON.parse(localStorage.getItem("libraryGames")) || [];

    // Tìm game trùng ID trong library (để hiển thị chính xác game user đang có)
    const foundGame = storedGames.find((item) => item.id === numericId);

    if (!foundGame) {
      alert("Game không tồn tại trong Thư viện. Đang chuyển hướng tới Thư viện.");
      navigate("/library");
    } else {
      setGame(foundGame);
    }
  }, [id, navigate]);

  // Remove from library function
  const handleRemoveFromLibrary = () => {
    if (!game) return;
    const storedGames = JSON.parse(localStorage.getItem("libraryGames")) || [];
    const updatedGames = storedGames.filter((g) => g.id !== game.id);
    localStorage.setItem("libraryGames", JSON.stringify(updatedGames));
    alert(`${game.title} đã được loại bỏ khỏi Thư viện của bạn.`);
    navigate("/library");
  };

  return (
    <Container>
      <Navbar />

      <ContentWrapper>
        {game ? (
          <GameDetailContainer>
            <GameHeader>
              <GameImageWrapper>
                <GameImage src={game.image} alt={game.title} />
              </GameImageWrapper>
              <GameTitle>{game.title}</GameTitle>
              <Buttons>
                <RemoveButton onClick={handleRemoveFromLibrary}>
                  Remove from Library
                </RemoveButton>
                <BackButton to="/library-game">Back to Library</BackButton>
              </Buttons>
            </GameHeader>

            {/* Tags */}
            <Tags>
              {Array.isArray(game.tags) && game.tags.length > 0 ? (
                game.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
              ) : (
                <Tag>No tags</Tag>
              )}
            </Tags>

            {/* Game Information */}
            <InfoBox>
              <InfoItem>
                <InfoTitle>Genre</InfoTitle>
                <InfoText>{game.genre || "N/A"}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Developer</InfoTitle>
                <InfoText>{game.developer || "N/A"}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Release Date</InfoTitle>
                <InfoText>{game.releaseDate || "N/A"}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Rating</InfoTitle>
                <InfoText>{game.rating || "N/A"}</InfoText>
              </InfoItem>
            </InfoBox>

            {/* Description */}
            <DescriptionBox>
              <SectionTitle>About This Game</SectionTitle>
              <DescriptionText>{game.description || "No description available."}</DescriptionText>
            </DescriptionBox>

            {/* Screenshots */}
            {Array.isArray(game.screenshots) && game.screenshots.length > 0 && (
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
                            JSON.parse(localStorage.getItem("libraryGames")) || [];
                          const alreadyInLib = storedGames.find(
                            (g) => g.id === featuredGame.id
                          );
                          if (!alreadyInLib) {
                            // Clone đủ thông tin
                            const newGame = {
                              ...featuredGame,
                              progress: { levelPercentage: 0, expPercentage: 0, achievementsPercentage: 0 },
                              achievements: []
                            };
                            storedGames.push(newGame);
                            localStorage.setItem(
                              "libraryGames",
                              JSON.stringify(storedGames)
                            );
                            alert(`${featuredGame.title} đã được thêm vào Thư viện của bạn!`);
                          } else {
                            alert(`${featuredGame.title} đã có trong Thư viện của bạn.`);
                          }
                        } else {
                          alert(`Không thể thêm ${featuredGame.title} vào Thư viện. Trò chơi này không miễn phí.`);
                        }
                      }}
                      maxWidth="300px"
                      height="150px"
                    />
                  ))}
              </GamesGridStyled>
            </FeaturedGamesSection>

            {/* Categorized Games Sections (MMO, Casual, etc.) */}
            {/* Tuỳ bạn bổ sung nếu muốn */}
          </GameDetailContainer>
        ) : (
          <div>Loading game details...</div>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default LibraryGameDetailPage;
