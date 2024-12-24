// GameDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Card from "../components/Card"; // Import the Card component

// Featured Games Data
const featuredGames = [
  { id: 9, title: "Lord of the Rings: Return to Moria", price: "321.000đ", image: "/game/Lord of the Rings.jpg" },
  { id: 10, title: "Ready or Not", price: "399.000đ", image: "/game/Ready or Not.jpg" },
  { id: 11, title: "Dead by Daylight", price: "340.000đ", image: "/game/Dead by Daylight.jpg" },
  { id: 12, title: "WWE 2K24", price: "1.000.000đ", image: "/game/WWE 2K24.jpg" },
  { id: 13, title: "Stellaris", price: "664.000đ", image: "/game/Stellaris.jpg", isLive: true },
  { id: 18, title: "Crab Game", price: "Free", image: "/game/Crab Game.jpg" },
];

// Categorized Games Data
const massivelyMultiplayerGames = [
  { id: 1, title: "Foxhole", price: "155.000đ", discount: "-38%", image: "/game/Foxhole.jpg" },
  { id: 2, title: "Hell Let Loose", price: "591.500đ", discount: "-50%", image: "/game/Hell Let Loose.jpg" },
  { id: 3, title: "SCUM", price: "282.500đ", discount: "-50%", image: "/game/SCUM.jpg" },
  { id: 4, title: "Test Drive Unlimited", price: "469.000đ", discount: "-30%", image: "/game/Test Drive Unlimited.jpg" },
  { id: 14, title: "War Thunder", price: "Free", discount: "-100%", image: "/game/War Thunder.jpg" },
  { id: 15, title: "Albion Online", price: "Free", discount: "-100%", image: "/game/Albion Online.jpg" },
];

const casualGames = [
  { id: 5, title: "Goat Simulator 3", price: "127.000đ", discount: "-67%", image: "/game/Goat Simulator 3.jpg" },
  { id: 6, title: "Luma Island", price: "160.000đ", discount: "-20%", image: "/game/Luma Island.jpg" },
  { id: 7, title: "F1 24", price: "436.000đ", discount: "-60%", image: "/game/F1 24.jpg" },
  { id: 8, title: "Dreamlight Valley", price: "667.500đ", discount: "-25%", image: "/game/Dreamlight Valley.jpg" },
  { id: 16, title: "Candy Crush Saga", price: "Free", discount: "-100%", image: "/game/Candy Crush Saga.jpg" },
  { id: 17, title: "Among Us", price: "Free", discount: "-100%", image: "/game/Among Us.jpg" },
];

// Mock data for games (including detailed info)
const gameData = [
  // Existing games
  {
    id: 1,
    title: "Foxhole",
    description:
      "Foxhole is a persistent, massively multiplayer game of war. It is a top-down MMO where every player matters. Participate in strategic battles and contribute to the war effort.",
    image: "/game/Foxhole.jpg",
    genre: "Massively Multiplayer",
    developer: "Clashstar",
    releaseDate: "2018-02-28",
    rating: "9/10",
    screenshots: [
      "/screenshots/Foxhole1.jpg",
      "/screenshots/Foxhole2.jpg",
      "/screenshots/Foxhole3.jpg",
    ],
  },
  // ... include all other games (ids 2 to 18)
  // For brevity, only including a few examples. Ensure all games are included similarly.
  {
    id: 2,
    title: "Hell Let Loose",
    description:
      "Hell Let Loose is a realistic World War II first-person shooter that emphasizes teamwork and strategy. Engage in large-scale battles with up to 100 players.",
    image: "/game/Hell Let Loose.jpg",
    genre: "Massively Multiplayer",
    developer: "Black Matter",
    releaseDate: "2019-06-23",
    rating: "8.5/10",
    screenshots: [
      "/screenshots/HellLetLoose1.jpg",
      "/screenshots/HellLetLoose2.jpg",
      "/screenshots/HellLetLoose3.jpg",
    ],
  },
  // ... continue adding all games up to id 18
  // Example for id 9:
  {
    id: 9,
    title: "Lord of the Rings: Return to Moria",
    description:
      "An immersive action RPG that takes players deep into the Mines of Moria, facing formidable foes and uncovering ancient secrets.",
    image: "/game/Lord of the Rings.jpg",
    genre: "Action RPG",
    developer: "Warner Bros. Games",
    releaseDate: "2023-04-12",
    rating: "9.2/10",
    screenshots: [
      "/screenshots/LordOfTheRings1.jpg",
      "/screenshots/LordOfTheRings2.jpg",
      "/screenshots/LordOfTheRings3.jpg",
    ],
  },
  // Add all other game entries similarly...
];

// Keyframes for animations
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
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Navbar = styled.nav`
  width: 100%;
  background-color: #2d333b;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  color: #c9d1d9;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #24292e;
  border-radius: 6px;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 100;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #c9d1d9;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: #3a424a;
  }
`;

// Simple NavLink
const NavLinkStyled = styled(Link)`
  color: #c9d1d9;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

// Game Detail Section
const GameDetailContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  animation: ${fadeIn} 1s ease-out;
  max-width: 1000px;
  margin: 0 auto;
`;

const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const GameImageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.6);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const GameImage = styled.img`
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
`;

const GameTitle = styled.h2`
  font-size: 32px;
  color: #0366d6;
  margin: 20px 0 10px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const PlayButton = styled.a`
  padding: 10px 20px;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 2px 5px rgba(23, 162, 184, 0.5);

  &:hover {
    background-color: #138496;
    transform: translateY(-2px);
  }
`;

const BackButton = styled(Link)`
  padding: 10px 20px;
  background-color: #6c757d;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 2px 5px rgba(108, 117, 125, 0.5);

  &:hover {
    background-color: #5a6268;
    transform: translateY(-2px);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
`;

const Tag = styled.span`
  background-color: #f1f8ff;
  color: #0366d6;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  flex: 1 1 200px;
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 5px 0;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #343a40;
  margin: 0;
  font-weight: 500;
`;

const DescriptionBox = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #0366d6;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #495057;
  line-height: 1.6;
`;

const Screenshots = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Screenshot = styled.img`
  width: calc(33.333% - 10px);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: calc(50% - 10px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Featured Games Section
const FeaturedGamesSection = styled.div`
  margin-top: 40px;
`;

const FeaturedGamesTitle = styled.h3`
  font-size: 24px;
  color: #0366d6;
  margin-bottom: 20px;
  text-align: center;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

// Categorized Games Sections
const CategorizedGamesSection = styled.div`
  margin-top: 40px;
`;

const CategorizedGamesTitle = styled.h3`
  font-size: 24px;
  color: #0366d6;
  margin-bottom: 20px;
  text-align: center;
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
      navigate("/library-game");
    }
  }, [id, navigate]);

  const handlePlay = () => {
    // Implement play functionality, e.g., redirect to game URL
    alert("Starting the game...");
  };

  return (
    <Container>
      {/* Top Navigation Bar */}
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
              <PlayButton href="#" onClick={handlePlay}>
                Play Now
              </PlayButton>
              <BackButton to="/library-game">Back to Library</BackButton>
            </Buttons>
          </GameHeader>

          {/* Tags */}
          <Tags>
            {/* Example tags, customize as needed */}
            <Tag>{game.genre}</Tag>
            <Tag>{game.developer}</Tag>
            <Tag>{game.rating}</Tag>
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
            <GamesGrid>
              {featuredGames.map((featuredGame) => (
                <Card
                  key={featuredGame.id}
                  image={featuredGame.image}
                  title={featuredGame.title}
                  description={`Price: ${featuredGame.price}`}
                  tags={featuredGame.isLive ? ["Live"] : []}
                  buttonText="View Details"
                  buttonLink={`/game/${featuredGame.id}`}
                  maxWidth="300px"
                  height="150px"
                />
              ))}
            </GamesGrid>
          </FeaturedGamesSection>

          {/* Massively Multiplayer Games Section */}
          <CategorizedGamesSection>
            <CategorizedGamesTitle>Massively Multiplayer Games</CategorizedGamesTitle>
            <GamesGrid>
              {massivelyMultiplayerGames.map((mmGame) => (
                <Card
                  key={mmGame.id}
                  image={mmGame.image}
                  title={mmGame.title}
                  description={`Price: ${mmGame.price} ${mmGame.discount ? `(${mmGame.discount})` : ""}`}
                  tags={mmGame.discount ? [mmGame.discount] : []}
                  buttonText="View Details"
                  buttonLink={`/game/${mmGame.id}`}
                  maxWidth="300px"
                  height="150px"
                />
              ))}
            </GamesGrid>
          </CategorizedGamesSection>

          {/* Casual Games Section */}
          <CategorizedGamesSection>
            <CategorizedGamesTitle>Casual Games</CategorizedGamesTitle>
            <GamesGrid>
              {casualGames.map((casualGame) => (
                <Card
                  key={casualGame.id}
                  image={casualGame.image}
                  title={casualGame.title}
                  description={`Price: ${casualGame.price} ${casualGame.discount ? `(${casualGame.discount})` : ""}`}
                  tags={casualGame.discount ? [casualGame.discount] : []}
                  buttonText="View Details"
                  buttonLink={`/game/${casualGame.id}`}
                  maxWidth="300px"
                  height="150px"
                />
              ))}
            </GamesGrid>
          </CategorizedGamesSection>
        </GameDetailContainer>
      )}
    </Container>
  );
};

export default GameDetailPage;
