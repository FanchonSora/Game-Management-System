import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import gameData from "../../data/gameData"; 
import HoverCard from "../../components/HoverCard";
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
  padding: 120px 20px 20px 20px; /* Adjust padding to account for fixed Navbar */
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

const CategorizedGamesSection = styled.div`
  margin-top: 40px;
`;

const CategorizedGamesTitle = styled.h2`
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

const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);

  useEffect(() => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      alert("Invalid game ID.");
      navigate("/library-game");
      return;
    }
    const foundGame = gameData.find((item) => item.id === numericId);
    if (foundGame) {
      setGame(foundGame);
    } else {
      alert("Game not found. Redirecting to Library.");
      navigate("/library-game");
    }
  }, [id, navigate]);

  const handleAddToLibrary = () => {
    if (game.price === 'Free') {
      const storedGames = JSON.parse(localStorage.getItem('libraryGames')) || [];
      if (!storedGames.find((g) => g.id === game.id)) {
        storedGames.push({ id: game.id, name: game.title });
        localStorage.setItem('libraryGames', JSON.stringify(storedGames));
        alert(`${game.title} has been added to your library!`);
      } else {
        alert(`${game.title} is already in your library.`);
      }
    }
  };

  const handlePurchase = () => {
    if (!game) return;

    const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
    const alreadyInCart = storedCart.find((g) => g.id === game.id);

    if (alreadyInCart) {
      alert(`${game.title} is already in your cart.`);
    } else {
      storedCart.push(game);
      localStorage.setItem("Cart", JSON.stringify(storedCart));
      alert(`${game.title} has been added to your cart.`);
    }
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
                {game.price === 'Free' ? (
                  <AddButton onClick={handleAddToLibrary}>Add to Library</AddButton>
                ) : (
                  <PurchaseButton onClick={handlePurchase}>Purchase</PurchaseButton>
                )}
                <BackButton to="/market-game">Back</BackButton>
              </Buttons>
            </GameHeader>
            <Tags>
              {game.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
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
            <DescriptionBox>
              <SectionTitle>About This Game</SectionTitle>
              <DescriptionText>{game.description}</DescriptionText>
            </DescriptionBox>
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
            <FeaturedGamesSection>
              <FeaturedGamesTitle>Featured Games</FeaturedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter((featuredGame) =>
                    featuredGame.tags.includes("Featured") && featuredGame.id !== game.id
                  )
                  .map((featuredGame) => (
                    <HoverCard
                      key={featuredGame.id}
                      image={featuredGame.image}
                      title={featuredGame.title}
                      gameId={featuredGame.id}
                    />
                  ))}
              </GamesGridStyled>
            </FeaturedGamesSection>
            <CategorizedGamesSection>
              <CategorizedGamesTitle>Casual Games</CategorizedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter((casualGame) =>
                    casualGame.tags.includes("Casual") && casualGame.id !== game.id
                  )
                  .map((casualGame) => (
                    <HoverCard
                      key={casualGame.id}
                      image={casualGame.image}
                      title={casualGame.title}
                      gameId={casualGame.id}
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
