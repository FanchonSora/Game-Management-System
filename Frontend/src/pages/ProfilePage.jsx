// File: src/pages/ProfilePage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/Navbar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/profile/${username}`);
        if (!response.ok) {
          throw new Error("Profile not found");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfileData();
    } else {
      setError("No user logged in");
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>Error: {error}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Body>
      {/* Navigation Bar */}
      <NavBar />

      {/* Profile Header */}
      <Header>
        <ProfileBanner>
          <BannerImage src={userData.profile_banner} alt="Profile Banner" />
        </ProfileBanner>
        <ProfileInfoContainer>
          <ProfilePicture src={userData.profile_picture} alt="Profile" />
          <ProfileDetails>
            <ProfileName>{userData.name}</ProfileName>
            <ProfileUsername>@{userData.username}</ProfileUsername>
            <ProfileEmail>{userData.email || "No information given."}</ProfileEmail>
          </ProfileDetails>
          <EditButton onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </EditButton>
        </ProfileInfoContainer>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Recent Activity Section */}
        <RecentActivitySection>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityDuration>0 hours past 2 weeks</ActivityDuration>
          <ActivityGrid>
            {userData.recent_activity.map((activity) => (
              <ActivityCard key={activity.id}>
                <ActivityImage src={activity.image} alt={activity.title} />
                <ActivityDetails>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityInfo>
                    {activity.playTime} <br /> Last played on {activity.lastPlayed}
                  </ActivityInfo>
                  <AchievementProgress>
                    Achievement Progress: {activity.achievementProgress}
                  </AchievementProgress>
                  <ProgressBarContainer>
                    <ProgressBar
                      width={
                        (parseInt(activity.achievementProgress.split(" ")[0]) /
                          parseInt(activity.achievementProgress.split(" ")[2])) *
                        100
                      }
                    />
                  </ProgressBarContainer>
                </ActivityDetails>
              </ActivityCard>
            ))}
          </ActivityGrid>
        </RecentActivitySection>

        {/* Currently Online Section */}
        <OnlineSection>
          <SectionTitle>Currently Online</SectionTitle>
          <Badges>
            Badges: <BadgeCount>1</BadgeCount>
          </Badges>
          <OnlineList>
            {/* You can populate this list with online users if available */}
          </OnlineList>
        </OnlineSection>
      </MainContent>
    </Body>
  );
};

export default ProfilePage;

// Styled-components

const Body = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  background: linear-gradient(to right, rgb(199, 90, 246), #2a2a3d);
  border-radius: 10px;
  overflow: hidden;
  margin: 20px auto;
  max-width: 1200px;
  width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ProfileBanner = styled.div`
  position: relative;
  height: 200px;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #2a2a3d;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #ffffff;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const ProfileDetails = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ProfileName = styled.h2`
  font-size: 28px;
  margin: 0;
  color: #ffffff;
`;

const ProfileUsername = styled.p`
  font-size: 16px;
  color: #a9a9a9;
  margin: 5px 0;
`;

const ProfileEmail = styled.p`
  font-size: 14px;
  color: #a9a9a9;
  margin: 5px 0;
`;

const EditButton = styled.button`
  background-color: #c759f6;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  position: absolute;
  right: 20px;
  top: 20px;

  &:hover {
    background-color: #b850e4;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(162, 68, 202, 0.7);
  }

  @media (max-width: 768px) {
    position: static;
    margin-top: 10px;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

const RecentActivitySection = styled.section`
  flex: 3;
  background: linear-gradient(to right, rgb(199, 90, 246), #2a2a3d);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
  color: #ffffff;
  text-align: center;
`;

const ActivityDuration = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: #a9a9a9;
  text-align: center;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const ActivityCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e2e;
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(162, 68, 202, 0.4);
  }
`;

const ActivityImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ActivityDetails = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
  color: #ffffff;
`;

const ActivityInfo = styled.p`
  font-size: 14px;
  color: #a9a9a9;
`;

const AchievementProgress = styled.p`
  font-size: 14px;
  color: #a9a9a9;
  margin-top: 10px;
`;

const ProgressBarContainer = styled.div`
  height: 8px;
  background-color: #576574;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #c759f6;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease;
`;

const OnlineSection = styled.section`
  flex: 1;
  background: linear-gradient(to right, rgb(199, 90, 246), #2a2a3d);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const Badges = styled.p`
  font-size: 14px;
  color: #e0e0e0;
  text-align: center;
`;

const BadgeCount = styled.span`
  font-weight: bold;
`;

const OnlineList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Loading and Error Containers
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e2e;
`;

const LoadingText = styled.p`
  color: #c7d5e0;
  font-size: 1.5rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e2e;
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 1.5rem;
`;
