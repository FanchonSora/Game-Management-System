// src/components/ActivityPage.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 100px 20px 20px 20px; /* Padding top để không bị ẩn bởi Navbar */
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActivityDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityType = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

const ActivityGame = styled.span`
  color: #555;
`;

const ActivityTimestamp = styled.span`
  color: #999;
  font-size: 12px;
`;

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem('userActivities')) || [];
    setActivities(storedActivities);
  }, []);

  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        <SectionTitle>Hoạt Động Của Bạn</SectionTitle>
        {activities.length === 0 ? (
          <p>Không có hoạt động nào để hiển thị.</p>
        ) : (
          <ActivityList>
            {activities.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityDetails>
                  <ActivityType>{activity.type} trò chơi</ActivityType>
                  <ActivityGame>{activity.gameTitle}</ActivityGame>
                </ActivityDetails>
                <ActivityTimestamp>{activity.timestamp}</ActivityTimestamp>
              </ActivityItem>
            ))}
          </ActivityList>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default ActivityPage;
