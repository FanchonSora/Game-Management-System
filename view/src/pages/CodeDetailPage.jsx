// CodeDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import Card from "../components/Card"; // Import the Card component

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);

// Mock data for code snippets
const codeData = [
  // ... your existing codeData
  // Add more code entries if needed
];

// Mock data for related codes
const relatedCodes = [
  {
    id: 5,
    title: "Pathfinding Algorithms",
    tags: ["Python", "C++"],
    description:
      "Implementing A* and Dijkstra's algorithms for efficient pathfinding in games.",
    link: "/code/5",
    image: "/code/pathfinding.jpg", // Ensure this image exists in your public folder
  },
  {
    id: 6,
    title: "AI Behavior Trees",
    tags: ["Python", "C++"],
    description:
      "Designing AI behavior trees to create complex and realistic NPC behaviors.",
    link: "/code/6",
    image: "/code/ai_behavior.jpg",
  },
  // Add more related code entries as needed
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

// Code Detail Section
const CodeDetailContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out;
  max-width: 1000px;
  margin: 0 auto;
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CodeTitle = styled.h2`
  font-size: 28px;
  color: #0366d6;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const DownloadButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 2px 5px rgba(40, 167, 69, 0.5);

  &:hover {
    background-color: #218838;
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
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: #f1f8ff;
  color: #0366d6;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 16px;
  color: #586069;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CodeBlock = styled.div`
  background-color: #f6f8fa;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
`;

// Tabs for Code Snippets
const LanguageTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const LanguageTab = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#0366d6" : "#e1e4e8")};
  color: ${(props) => (props.active ? "#fff" : "#24292e")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#0356b6" : "#d1d5da")};
    transform: translateY(-2px);
  }
`;

// Notification (Optional)
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: #fff;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out, fadeOut 0.3s ease-out 2.5s forwards;
  opacity: 0;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

// Related Codes Section
const RelatedCodesSection = styled.div`
  margin-top: 40px;
`;

const RelatedCodesTitle = styled.h3`
  font-size: 24px;
  color: #0366d6;
  margin-bottom: 20px;
  text-align: center;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const CodeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const foundCode = codeData.find((item) => item.id === parseInt(id));
    if (foundCode) {
      setCode(foundCode);
      const languages = Object.keys(foundCode.codeSnippets);
      if (languages.length > 0) {
        setActiveLanguage(languages[0]);
      }
    } else {
      navigate("/library-code");
    }
  }, [id, navigate]);

  const handleDownload = () => {
    // Implement actual download functionality here
    setNotification("Code download initiated!");
    setTimeout(() => setNotification(""), 3000);
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

      {/* Code Detail Section */}
      {code && (
        <CodeDetailContainer>
          <CodeHeader>
            <CodeTitle>{code.title}</CodeTitle>
            <Buttons>
              <DownloadButton onClick={handleDownload}>Download</DownloadButton>
              <BackButton to="/library-code">Back to Library</BackButton>
            </Buttons>
          </CodeHeader>

          {/* Tags */}
          <Tags>
            {code.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>

          {/* Description */}
          <Description>{code.description}</Description>

          {/* Language Tabs */}
          <LanguageTabs>
            {Object.keys(code.codeSnippets).map((language) => (
              <LanguageTab
                key={language}
                active={activeLanguage === language}
                onClick={() => setActiveLanguage(language)}
              >
                {language}
              </LanguageTab>
            ))}
          </LanguageTabs>

          {/* Code Snippet */}
          <CodeBlock>
            <SyntaxHighlighter
              language={
                activeLanguage.includes("C++") ? "cpp" : activeLanguage.toLowerCase()
              }
              style={github}
              showLineNumbers
            >
              {code.codeSnippets[activeLanguage]}
            </SyntaxHighlighter>
          </CodeBlock>

          {/* Related Codes Section */}
          <RelatedCodesSection>
            <RelatedCodesTitle>Related Code Snippets</RelatedCodesTitle>
            <CardsGrid>
              {relatedCodes.map((relatedCode) => (
                <Card
                  key={relatedCode.id}
                  image={relatedCode.image}
                  title={relatedCode.title}
                  description={relatedCode.description}
                  tags={relatedCode.tags}
                  buttonText="View Code"
                  buttonLink={relatedCode.link}
                  maxWidth="300px"
                />
              ))}
            </CardsGrid>
          </RelatedCodesSection>
        </CodeDetailContainer>
      )}

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default CodeDetailPage;
