// File: src/pages/LibraryGameDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaThumbsUp, FaComment, FaStar, FaHeart, FaPlus } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

// =============== Styled Components ===============

// Animation Keyframes for Notification
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// Container
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
`;

// Main Content
const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Featured Section
const FeaturedSection = styled.div`
  background-color: #2a2a3d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FeaturedHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FeaturedLabel = styled.div`
  background-color: rgb(199, 90, 246);
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 500;
`;

const UpdateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UpdateIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #1e1e2e;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const UpdateText = styled.div`
  h3 {
    margin: 0;
    color: #ffffff;
  }
  p {
    margin: 5px 0 0;
    font-size: 14px;
  }
`;

// Activity Section
const ActivitySection = styled.div`
  background-color: #2a2a3d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ActivityInput = styled.textarea`
  width: 95%;
  padding: 15px;
  background-color: #1e1e2e;
  border: 1px solid #384959;
  border-radius: 4px;
  color: #c7d5e0;
  resize: none;
  margin-bottom: 10px;

  &::placeholder {
    color: #8a8a8a;
  }
`;

// Friends Section
const SideSection = styled.div`
  background-color: #2a2a3d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 15px;
`;

const FriendsList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FriendAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

// Achievements Section
const AchievementsSection = styled(SideSection)`
  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #1e1e2e;
    border-radius: 4px;
    margin: 10px 0;
  }

  .progress {
    height: 100%;
    background-color:rgb(199, 90, 246);
    border-radius: 4px;
  }
`;

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const AchievementIcon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 4px;
`;

const AchievementInfo = styled.div`
  h4 {
    margin: 0;
    color: #ffffff;
  }
  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #8a8a8a;
  }
`;

// Stats
const Stats = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #8a8a8a;
  font-size: 14px;
`;

// =============== Thêm TÍNH NĂNG MỚI ===============

// Rating & Favorite Section
const RatingFavoriteSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  gap: 5px;
`;

const StarIcon = styled(FaStar)`
  cursor: pointer;
  color: ${(props) => (props.active ? "rgb(223, 124, 236)" : "#fff")};
  font-size: 20px;
  transition: color 0.2s ease;
`;

// Favorite Button
const FavoriteButton = styled.button`
  background-color: ${(props) => (props.favorite ? "rgb(223, 124, 236)" : "#2d2d3d")};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.favorite ? "rgb(191, 125, 199)" : "rgb(204, 135, 213)")};
  }
`;

// Reviews Section
const ReviewsSection = styled.div`
  background-color: #2a2a3d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewInput = styled.textarea`
  width: 95%;
  padding: 12px;
  background-color: #1e1e2e;
  border: 1px solid #384959;
  border-radius: 4px;
  color: #c7d5e0;
  resize: vertical;

  &::placeholder {
    color: #8a8a8a;
  }
`;

const ReviewButton = styled.button`
  align-self: flex-end;
  background-color: rgb(199, 90, 246);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
  }
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #3e3e5c;
  padding: 10px 0;

  p {
    margin: 0;
    font-size: 14px;
  }
  small {
    color: #8a8a8a;
  }
`;

// Screenshots Section
const ScreenshotsSection = styled.div`
  background-color: #2a2a3d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ScreenshotsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ScreenshotForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const ScreenshotInput = styled.input`
  padding: 8px;
  background-color: #1e1e2e;
  border: 1px solid #384959;
  border-radius: 4px;
  color: #c7d5e0;
`;

const ScreenshotButton = styled.button`
  align-self: flex-end;
  background-color: rgb(199, 90, 246);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
  }
`;

// Modal for Notifications
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color:rgb(199, 90, 246); /* màu xanh lá thông báo */
  color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-out, ${fadeOut} 0.3s ease-out 2.5s forwards;
  opacity: 1;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 90%;
    right: 5%;
  }
`;

// ==================================================

const LibraryGameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  // State cho Rating, Favorite
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // State cho Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");

  // State cho Screenshots
  const [screenshots, setScreenshots] = useState([]);
  const [screenshotInput, setScreenshotInput] = useState("");

  // State cho Notifications
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Lấy dữ liệu game từ localStorage
    const games = JSON.parse(localStorage.getItem('libraryGames')) || [];
    const gameData = games.find(g => g.id === parseInt(id));
    if (!gameData) return;

    // Nếu game chưa có các thuộc tính mới, thêm vào để tránh lỗi
    if (gameData.rating === undefined) gameData.rating = 0;
    if (gameData.isFavorite === undefined) gameData.isFavorite = false;
    if (!Array.isArray(gameData.reviews)) gameData.reviews = [];
    if (!Array.isArray(gameData.screenshots)) gameData.screenshots = [];

    setGame(gameData);
    setRating(gameData.rating);
    setIsFavorite(gameData.isFavorite);
    setReviews(gameData.reviews);
    setScreenshots(gameData.screenshots);
  }, [id]);

  if (!game) {
    return <Container><Navbar /><MainContent>Loading...</MainContent></Container>;
  }

  // Lưu các thay đổi vào localStorage
  const saveGameData = (updatedData) => {
    const games = JSON.parse(localStorage.getItem("libraryGames")) || [];
    const index = games.findIndex(g => g.id === parseInt(id));
    if (index >= 0) {
      games[index] = updatedData;
      localStorage.setItem("libraryGames", JSON.stringify(games));
    }
  };

  // Xử lý đánh giá (rating)
  const handleSetRating = (star) => {
    setRating(star);
    const updatedGame = { ...game, rating: star };
    setGame(updatedGame);
    saveGameData(updatedGame);
  };

  // Xử lý toggle favorite
  const handleToggleFavorite = () => {
    const updatedGame = { ...game, isFavorite: !isFavorite };
    setIsFavorite(!isFavorite);
    setGame(updatedGame);
    saveGameData(updatedGame);
    setNotification(isFavorite ? "Removed from favorites!" : "Added to favorites!");
    setTimeout(() => setNotification(""), 3000);
  };

  // Xử lý thêm review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;
    const newReview = {
      id: Date.now(),
      content: reviewInput.trim(),
      date: new Date().toLocaleString(),
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setReviewInput("");

    const updatedGame = { ...game, reviews: updatedReviews };
    setGame(updatedGame);
    saveGameData(updatedGame);
    setNotification("Review added successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  // Xử lý thêm screenshot từ URL hoặc upload
  const handleAddScreenshot = (e) => {
    e.preventDefault();
    if (!screenshotInput.trim()) return;

    // Kiểm tra xem đây là URL hay không
    const isURL = /^(ftp|http|https):\/\/[^ "]+$/.test(screenshotInput.trim());

    if (isURL) {
      // Nếu là URL, thêm trực tiếp
      const updatedScreenshots = [...screenshots, screenshotInput.trim()];
      setScreenshots(updatedScreenshots);
      setScreenshotInput("");

      const updatedGame = { ...game, screenshots: updatedScreenshots };
      setGame(updatedGame);
      saveGameData(updatedGame);
      setNotification("Screenshot added successfully!");
      setTimeout(() => setNotification(""), 3000);
    } else {
      // Nếu không phải URL, thông báo lỗi
      setNotification("Please enter a valid image URL.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Xử lý upload ảnh từ máy tính
  const handleUploadScreenshots = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const fileArray = Array.from(files);
    const promises = fileArray.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then(results => {
        const updatedScreenshots = [...screenshots, ...results];
        setScreenshots(updatedScreenshots);

        const updatedGame = { ...game, screenshots: updatedScreenshots };
        setGame(updatedGame);
        saveGameData(updatedGame);
        setNotification("Screenshots uploaded successfully!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch(err => {
        console.error(err);
        setNotification("Failed to upload screenshots.");
        setTimeout(() => setNotification(""), 3000);
      });
  };

  // Xử lý xóa screenshot
  const handleRemoveScreenshot = (index) => {
    const updatedScreenshots = screenshots.filter((_, idx) => idx !== index);
    setScreenshots(updatedScreenshots);

    const updatedGame = { ...game, screenshots: updatedScreenshots };
    setGame(updatedGame);
    saveGameData(updatedGame);
    setNotification("Screenshot removed successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <Container>
      <Navbar />
      <MainContent>

        {/* FEATURED SECTION */}
        <FeaturedSection>
          <FeaturedHeader>
            <FeaturedLabel>FEATURED</FeaturedLabel>
          </FeaturedHeader>
          <UpdateInfo>
            <UpdateIcon>🎮</UpdateIcon>
            <UpdateText>
              <h3>{game.title}</h3>
              <p>Last played: Recently</p>
            </UpdateText>
          </UpdateInfo>

          {/* Rating & Favorite */}
          <RatingFavoriteSection>
            <Stars>
              {[1,2,3,4,5].map(star => (
                <StarIcon
                  key={star}
                  active={star <= rating}
                  onClick={() => handleSetRating(star)}
                />
              ))}
            </Stars>
            <FavoriteButton
              favorite={isFavorite}
              onClick={handleToggleFavorite}
            >
              <FaHeart />
              {isFavorite ? "Favorite" : "Add Favorite"}
            </FavoriteButton>
          </RatingFavoriteSection>
        </FeaturedSection>

        {/* ACTIVITY SECTION (mô tả game, post status) */}
        <ActivitySection>
          <ActivityInput
            placeholder="Say something about this game to your friends..."
            rows={3}
          />
          <Stats>
            <Stat>
              <FaThumbsUp /> 946
            </Stat>
            <Stat>
              <FaComment /> 7
            </Stat>
          </Stats>
        </ActivitySection>

        {/* FRIENDS WHO PLAY */}
        <SideSection>
          <SectionTitle>FRIENDS WHO PLAY</SectionTitle>
          <FriendsList>
            <FriendAvatar src="/api/placeholder/32/32" alt="Friend" />
            <FriendAvatar src="/api/placeholder/32/32" alt="Friend" />
            <FriendAvatar src="/api/placeholder/32/32" alt="Friend" />
          </FriendsList>
        </SideSection>

        {/* ACHIEVEMENTS */}
        <AchievementsSection>
          <SectionTitle>ACHIEVEMENTS</SectionTitle>
          <div>You've unlocked 6/38 (15%)</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: '15%' }} />
          </div>
          <Achievement>
            <AchievementIcon src="/api/placeholder/64/64" alt="Achievement" />
            <AchievementInfo>
              <h4>Novice Player</h4>
              <p>Complete your first game</p>
            </AchievementInfo>
          </Achievement>
        </AchievementsSection>

        {/* REVIEWS SECTION */}
        <ReviewsSection>
          <SectionTitle>Reviews</SectionTitle>
          <ReviewForm onSubmit={handleAddReview}>
            <ReviewInput
              rows={3}
              placeholder="Write your review here..."
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
            />
            <ReviewButton type="submit">Add Review</ReviewButton>
          </ReviewForm>

          <ReviewList>
            {reviews.map(review => (
              <ReviewItem key={review.id}>
                <p>{review.content}</p>
                <small>{review.date}</small>
              </ReviewItem>
            ))}
            {reviews.length === 0 && (
              <p style={{ color: "#a9a9a9" }}>No reviews yet.</p>
            )}
          </ReviewList>
        </ReviewsSection>

        {/* SCREENSHOTS SECTION */}
        <ScreenshotsSection>
          <SectionTitle>Screenshots</SectionTitle>
          <ScreenshotsGrid>
            {screenshots.map((shot, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img src={shot} alt={`Screenshot ${idx}`} />
                <RemoveButton onClick={() => handleRemoveScreenshot(idx)}>✕</RemoveButton>
              </div>
            ))}
          </ScreenshotsGrid>

          {/* Form thêm screenshot từ URL */}
          <ScreenshotForm onSubmit={handleAddScreenshot}>
            <ScreenshotInput
              type="text"
              placeholder="Paste screenshot URL here..."
              value={screenshotInput}
              onChange={(e) => setScreenshotInput(e.target.value)}
            />
            <ScreenshotButton type="submit"><FaPlus /> Add Screenshot</ScreenshotButton>
          </ScreenshotForm>

          {/* Upload ảnh từ máy tính */}
          <UploadForm>
            <UploadLabel htmlFor="upload-screenshot">Upload Screenshots from Computer:</UploadLabel>
            <UploadInput
              type="file"
              id="upload-screenshot"
              multiple
              accept="image/*"
              onChange={handleUploadScreenshots}
            />
          </UploadForm>
        </ScreenshotsSection>

      </MainContent>

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

// Additional Styled Components

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

const UploadForm = styled.div`
  margin-top: 20px;
`;

const UploadLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #c7d5e0;
  font-size: 14px;
`;

const UploadInput = styled.input`
  padding: 8px;
  background-color: #1e1e2e;
  border: 1px solid #384959;
  border-radius: 4px;
  color: #c7d5e0;
  width: 100%;
  cursor: pointer;

  &:hover {
    border-color: #66c0f4;
  }
`;

export default LibraryGameDetailPage;
