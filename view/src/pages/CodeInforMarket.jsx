// ExpensesTrackerPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(135deg, #182b3a 0%, #0d1c2e 100%);
  color: #c7d5e0;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const MainContent = styled.div`
  display: flex;
  background-color: #1e2a38;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background-color: #16202c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: ${slideInLeft} 1s ease-out;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  object-fit: cover;
`;

const InfoSection = styled.div`
  flex: 1.5;
  padding: 30px;
  background-color: #1e2a38;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${slideInRight} 1s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ProductTitle = styled.h2`
  font-size: 28px;
  color: #fff;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 22px;
  color: #ff4d6d;
  margin-bottom: 20px;
`;

const Discount = styled.span`
  text-decoration: line-through;
  color: #d9534f;
  margin-right: 10px;
  font-size: 18px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  background-color: #f1f1f1;
  color: #333;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 20px;
  font-size: 14px;
`;

const Languages = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const Language = styled.span`
  background-color: #f1f1f1;
  color: #333;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 20px;
  font-size: 14px;
`;

const Verticals = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Vertical = styled.span`
  background-color: #f1f1f1;
  color: #333;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 20px;
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

const DownloadButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);

  &:hover {
    background-color: #0056b3;
  }
`;

const ViewButton = styled.button`
  padding: 12px 24px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(40, 167, 69, 0.5);

  &:hover {
    background-color: #1e7e34;
  }
`;

const ProductDetailsSection = styled.div`
  background-color: #1e2a38;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ProductDetailsTitle = styled.h3`
  font-size: 24px;
  color: #fff;
  margin-bottom: 15px;
`;

const ProductDetailsText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #ccc;
`;

const Footer = styled.footer`
  background-color: #16202c;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 1000px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DeveloperSection = styled.div`
  text-align: center;
`;

const DeveloperTitle = styled.h4`
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
`;

const DeveloperName = styled.p`
  font-size: 16px;
  color: #ccc;
  margin-bottom: 20px;
`;

const DeveloperActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #ffc107;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(255, 193, 7, 0.5);

  &:hover {
    background-color: #e0a800;
  }
`;

const ReleaseDate = styled.p`
  font-size: 14px;
  color: #ccc;
`;

// ExpensesTrackerPage Component
const ExpensesTrackerPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation to CodePage
  const handleView = () => {
    navigate("/code-page"); // Replace with the actual route to CodePage
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <Title>Expenses Tracker</Title>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Image Section */}
        <ImageSection>
          <ProductImage
            src="/path/to/screenshot.jpg" // Replace with the actual image path
            alt="Expenses Tracker"
          />
        </ImageSection>

        {/* Info Section */}
        <InfoSection>
          <div>
            <ProductTitle>Weekly Free</ProductTitle>
            <Price>
              <Discount>$144.00</Discount> - For a limited time this source code is free for the PieceX community.
            </Price>

            {/* Tags */}
            <Tags>
              <Tag>System</Tag>
              <Tag>Web System</Tag>
            </Tags>

            {/* Languages */}
            <Languages>
              <Language>JavaScript</Language>
              <Language>PHP</Language>
              <Language>HTML</Language>
              <Language>CSS</Language>
            </Languages>

            {/* Verticals */}
            <Verticals>
              <Vertical>Tax & Accounting</Vertical>
              <Vertical>Payments & FinTech</Vertical>
              <Vertical>Web</Vertical>
            </Verticals>
          </div>

          {/* Buttons */}
          <Buttons>
            <DownloadButton>Download</DownloadButton>
            <ViewButton onClick={handleView}>View</ViewButton>
          </Buttons>
        </InfoSection>
      </MainContent>

      {/* Product Details */}
      <ProductDetailsSection>
        <ProductDetailsTitle>Product Details</ProductDetailsTitle>
        <ProductDetailsText>
          The expenses tracker system is a simple plug-and-play software designed to help you track your budget and expenses. It allows you to easily view all your budget, see how much you've spent, and plan your expenses accordingly. Comes with a built-in user and permission system that lets you assign others to work and view your reports easily.
        </ProductDetailsText>
      </ProductDetailsSection>

      {/* Footer */}
      <Footer>
        <DeveloperSection>
          <DeveloperTitle>Developer</DeveloperTitle>
          <DeveloperName>Frost Programming</DeveloperName>
          <DeveloperActions>
            <ActionButton>Request Code Sample</ActionButton>
            <ActionButton>Direct Message</ActionButton>
            <ActionButton>Seller Support</ActionButton>
          </DeveloperActions>
          <ReleaseDate>Apr 20, 2024</ReleaseDate>
        </DeveloperSection>
      </Footer>
    </Container>
  );
};

export default ExpensesTrackerPage;
