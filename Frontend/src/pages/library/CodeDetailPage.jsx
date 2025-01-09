// src/pages/CodeDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Use a dark theme
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import CodeCard from "../../components/CodeCard"; // Import CodeCard component

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);

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
  background-color: #2a2a3d;
  color:rgb(255, 255, 255);
  min-height: 100vh;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CodeDetailContainer = styled.div`
  background-color: #1e1e2e;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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
  color: rgb(199, 90, 246);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

// Download Button
const DownloadButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(199, 90, 246);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 2px 5px rgba(199, 90, 246, 0.5);

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(184, 81, 228, 0.5);
  }
`;

// Back Button
const BackButton = styled(Link)`
  padding: 10px 20px;
  background-color: rgb(199, 90, 246);
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 2px 5px rgb(199, 90, 246);

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

// Tags
const Tags = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: rgb(199, 90, 246);
  color: #fff;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

// Description
const Description = styled.p`
  font-size: 16px;
  color:rgb(255, 255, 255);
  line-height: 1.6;
  margin-bottom: 20px;
`;

// Code Block
const CodeBlock = styled.div`
  background-color: #2a2a3d;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Language Tabs
const LanguageTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const LanguageTab = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "rgb(199, 90, 246)" : "#3a3a4d")};
  color: ${(props) => (props.active ? "#fff" : "#c7d5e0")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.active ? "rgb(184, 81, 228)" : "#4a4a5c"};
    transform: translateY(-2px);
  }
`;

// Notification (Optional)
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgb(199, 90, 246);
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
  color: rgb(199, 90, 246);
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ImplementButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(199, 90, 246);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s;
  margin-right: 20px; 
  margin-top: 10px;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const ImplementationContainer = styled.div`
  background-color: #2a2a3d;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  margin-top: 2rem;
  line-height: 1.4;
  white-space: pre-line; /* Preserve line breaks */
  color: #fff;
`;

// CodeDetailPage Component
const CodeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("");
  const [notification, setNotification] = useState("");
  const [showImplementation, setShowImplementation] = useState(false);

  const libraryCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];

  useEffect(() => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      alert("ID code không hợp lệ.");
      navigate("/library-code");
    }
    const foundCode = libraryCodes.find((item) => item.id === numericId);
    if (foundCode) {
      setCode(foundCode);
      const languages = Object.keys(foundCode.codeSnippets);
      if (languages.length > 0) {
        setActiveLanguage(languages[0]);
      }
    } else {
      alert("Không tìm thấy code. Đang chuyển hướng đến Thư viện.");
      navigate("/library-code");
    }
  }, [id, navigate, libraryCodes]);

  const handleDownload = () => {
    // Implement download functionality here
    // Example: Create a Blob and trigger download
    if (code) {
      const language = activeLanguage.toLowerCase();
      const extension = language === "python" ? "py" : language === "cpp" ? "cpp" : "txt";
      const element = document.createElement("a");
      const file = new Blob([code.codeSnippets[activeLanguage]], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${code.title}.${extension}`;
      document.body.appendChild(element); // Required for Firefox
      element.click();
      alert("Code đã được tải xuống!");
      // Remove the element after download
      document.body.removeChild(element);
    }
  };

  return (
    <Container>
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

          {/* "Implement" Button and howToImplement Content */}
          {code.howToImplement && (
            <>
              <ImplementButton
                onClick={() => setShowImplementation(!showImplementation)}
              >
                {showImplementation
                  ? "Hide Implementation Guide"
                  : "Show Implementation Guide"}
              </ImplementButton>
              {showImplementation && (
                <ImplementationContainer>
                  {code.howToImplement}
                </ImplementationContainer>
              )}
            </>
          )}

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
                activeLanguage.toLowerCase() === "cpp"
                  ? "cpp"
                  : activeLanguage.toLowerCase()
              }
              style={monokai} // Use a dark theme
              showLineNumbers
            >
              {code.codeSnippets[activeLanguage]}
            </SyntaxHighlighter>
          </CodeBlock>

          {/* Related Codes Section */}
          <RelatedCodesSection>
            <RelatedCodesTitle>Related Code Snippets</RelatedCodesTitle>
            <CardsGrid>
              {libraryCodes
                .filter(
                  (relatedCode) =>
                    relatedCode.id !== code.id &&
                    relatedCode.tags.some((tag) => code.tags.includes(tag))
                )
                .map((relatedCode) => (
                  <CodeCard
                    key={relatedCode.id}
                    image={relatedCode.image}
                    title={relatedCode.title}
                    description={relatedCode.description}
                    tags={relatedCode.tags}
                    buttonText="View Code"
                    buttonLink={`/library-code/${relatedCode.id}`}
                    isAdded={false}
                    onAddToLibrary={() => {}}
                    maxWidth="300px"
                    height="auto"
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
