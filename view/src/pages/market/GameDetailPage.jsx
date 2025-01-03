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
  background-color: #1e1e2e; /* Đổi màu nền sang màu tối */
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  min-height: 100vh;
  padding: 120px 20px 20px 20px; /* Điều chỉnh padding để phù hợp với Navbar cố định */
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(30, 30, 46, 0.8); /* Thêm lớp phủ tối hơn để tăng độ tương phản */
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Thêm bóng chữ */
  animation: ${fadeIn} 1s ease-out;
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
  margin-top: 3rem;
  width: 500px;
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
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Thêm bóng chữ */
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

// Các nút sử dụng cùng một kiểu dáng như HomePage.jsx
const AddButton = styled.button`
  background-color: rgb(199, 90, 246);
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s, box-shadow 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const PurchaseButton = styled(AddButton)`
  background-color: rgb(199, 90, 246); /* Sử dụng cùng màu nền */
`;

const BackButton = styled(Link)`
  background-color: rgb(199, 90, 246);
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s, box-shadow 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: rgb(199, 90, 246);
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background-color: #2a2a3d; /* Đổi màu nền sang màu tối */
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
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  margin-bottom: 5px;
`;

const InfoText = styled.span`
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
`;

const DescriptionBox = styled.div`
  background-color: #2a2a3d; /* Đổi màu nền sang màu tối */
  padding: 20px;
  border-radius: 10px;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
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
  font-size: 2rem;
  margin-bottom: 20px;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Thêm bóng chữ */
`;

const CategorizedGamesSection = styled.div`
  margin-top: 40px;
`;

const CategorizedGamesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #c7d5e0; /* Đổi màu chữ sang màu sáng */
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Thêm bóng chữ */
`;

const GamesGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

// HeartIcon Component (SVG)
const HeartIcon = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#rgb(199, 90, 246)" : "none"}
    stroke={filled ? "#rgb(199, 90, 246)" : "rgb(184, 81, 228)"}
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// FavoriteButton Styled Component
const FavoriteButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-out;

  &:hover svg {
    fill: #ff4d6d;
    stroke: #ff4d6d;
  }
`;

// ProductCard Component
const ProductCard = ({ product, toggleFavorite, viewDetails, isFavorite }) => {
  return (
    <Card>
      <FavoriteButton onClick={() => toggleFavorite(product.id)}>
        <HeartIcon filled={isFavorite} />
      </FavoriteButton>
      <GameImage src={product.image} alt={product.title} />
      <GameTitle>{product.title}</GameTitle>
      <GameCategory>{product.category}</GameCategory>
      <GamePrice>{product.price === "Free" ? "Free" : `$${product.price.toFixed(2)}`}</GamePrice>
      <ButtonGroup>
        {product.price === "Free" && (
          <ActionButton onClick={() => viewDetails(product.id)}>Add</ActionButton>
        )}
        <ActionButton onClick={() => viewDetails(product.id)}>Details</ActionButton>
      </ButtonGroup>
    </Card>
  );
};

// ProductsSection Component
const ProductsSection = ({
  title,
  products,
  toggleFavorite,
  viewDetails,
  favorites,
}) => {
  return (
    <ProductsSectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            toggleFavorite={toggleFavorite}
            viewDetails={viewDetails}
            isFavorite={favorites.has(product.id)}
          />
        ))}
      </Grid>
    </ProductsSectionContainer>
  );
};

// GameDetailPage Component
const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return new Set(storedFavorites);
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return new Set();
    }
  });

  // Thêm 2 state để check ngày phát hành
  const [isReleased, setIsReleased] = useState(false);
  const [releaseMessage, setReleaseMessage] = useState("");

  // Update localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Fetch game details
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

  // Check ngày phát hành
  useEffect(() => {
    if (game) {
      const releaseDateObj = new Date(game.releaseDate);
      const today = new Date();

      if (isNaN(releaseDateObj.getTime())) {
        setReleaseMessage("Invalid release date");
        setIsReleased(false);
      } else if (releaseDateObj > today) {
        setIsReleased(false);
        setReleaseMessage(`The game will be released on ${game.releaseDate}`);
      } else {
        setIsReleased(true);
        setReleaseMessage("");
      }
    }
  }, [game]);

  // Cycle through featured games every 5 seconds
  useEffect(() => {
    const featuredGames = gameData.filter(
      (game) => game.tags.includes("Featured") && game.id !== Number(id)
    );
    if (featuredGames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  // Handle adding to library
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

  // Handle purchase
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

  // Handle viewing details of featured games
  const handleViewDetailsFeatured = (featuredGame) => {
    navigate(`/market-game/${featuredGame.id}`);
  };

  const featuredGames = gameData.filter(
    (featuredGame) => featuredGame.tags.includes("Featured") && featuredGame.id !== Number(id)
  );

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

              {/* Logic hiển thị nút dựa trên trạng thái isReleased */}
              {!isReleased ? (
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                  <p>{releaseMessage}</p>
                </div>
              ) : (
                <Buttons>
                  {game.price === 'Free' ? (
                    <AddButton onClick={handleAddToLibrary}>Add to Library</AddButton>
                  ) : (
                    <PurchaseButton onClick={handlePurchase}>Purchase</PurchaseButton>
                  )}
                  <BackButton to="/market-game">Back</BackButton>
                </Buttons>
              )}
            </GameHeader>

            <Tags>
              {game.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>

            <InfoBox>
              <InfoItem>
                <InfoTitle> Status detection action</InfoTitle>
                <InfoText>
                  {isReleased ? "Released" : releaseMessage}
                </InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Genre</InfoTitle>
                <InfoText>{game.genre}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Developer</InfoTitle>
                <InfoText>{game.developer}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Developer</InfoTitle>
                <InfoText>{game.publisher}</InfoText>
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

            {featuredGames.length > 0 && (
              <FeaturedGamesSection>
                <FeaturedGamesTitle>Featured Games</FeaturedGamesTitle>
                <GamesGridStyled>
                  {featuredGames.map((featuredGame) => (
                    <HoverCard
                      key={featuredGame.id}
                      image={featuredGame.image}
                      title={featuredGame.title}
                      gameId={featuredGame.id}
                      onClick={() => handleViewDetailsFeatured(featuredGame)}
                    />
                  ))}
                </GamesGridStyled>
              </FeaturedGamesSection>
            )}

            <CategorizedGamesSection>
              <CategorizedGamesTitle>Casual Games</CategorizedGamesTitle>
              <GamesGridStyled>
                {gameData
                  .filter(
                    (casualGame) =>
                      casualGame.tags.includes("Casual") && casualGame.id !== Number(id)
                  )
                  .map((casualGame) => (
                    <HoverCard
                      key={casualGame.id}
                      image={casualGame.image}
                      title={casualGame.title}
                      gameId={casualGame.id}
                      onClick={() => navigate(`/market-game/${casualGame.id}`)}
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