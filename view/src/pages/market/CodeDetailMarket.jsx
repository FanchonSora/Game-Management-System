import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import marketCodes from "../../data/marketCodes"; // Đảm bảo dữ liệu có sẵn trong file này
import Navbar from "../../components/Navbar";

// Đăng ký ngôn ngữ
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("javascript", javascript);

// Keyframes
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
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
  padding: 80px 20px 20px 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CodeDetailContainer = styled.div`
  background-color: #2a2a3d; /* Màu giống trang homepage */
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out;
  max-width: 1000px;
  margin: 0 auto;
  color: #fff;
  margin-top: 3rem;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CodeTitle = styled.h2`
  font-size: 28px;
  color: #f9f9f9; /* Cập nhật màu cho tiêu đề */
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const DownloadButton = styled.button`
  padding: 12px 24px;
  background-color: rgb(199, 90, 246); /* Màu giống homepage */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);

  &:hover {
    background-color: rgb(184, 81, 228);
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: rgb(199, 90, 246); /* Màu giống homepage */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);

  &:hover {
    background-color: rgb(184, 81, 228);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

// New PurchaseButton styled
const PurchaseButton = styled.button`
  padding: 12px 24px;
  background-color: rgb(255, 87, 34); /* Màu khác để phân biệt Purchase */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(255, 87, 34, 0.5);

  &:hover {
    background-color: rgb(241, 76, 16);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: rgb(199, 90, 246); /* Màu giống homepage */
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CodeBlock = styled.div`
  background-color: #1e1e2e;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Nút Implement
const ImplementButton = styled.button`
  padding: 12px 24px;
  background-color: rgb(199, 90, 246); /* Màu giống homepage */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);
  margin-bottom: 20px;

  &:hover {
    background-color: rgb(184, 81, 228);
  }
`;

const ImplementationContainer = styled.div`
  background-color: #1e1e2e;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  white-space: pre-line; /* Giúp xuống dòng theo chuỗi howToImplement */
  line-height: 1.6;
  font-size: 15px;
  color: #fff;
`;

// Notification
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: #fff;
  padding: 15px 25px;
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

const CodeDetailMarket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("");
  const [notification, setNotification] = useState("");
  const [showImplementation, setShowImplementation] = useState(false);

  // Gom tất cả code vào 1 mảng
  const allCodes = [
    ...marketCodes.featuredCodes,
    ...marketCodes.libraries,
    ...marketCodes.snippets,
    ...marketCodes.tools,
  ];

  useEffect(() => {
    // Tìm code dựa theo ID
    const foundCode = allCodes.find((item) => item.id === Number(id));

    if (foundCode) {
      setCode(foundCode);

      // Nếu codeSnippets tồn tại, lấy key đầu tiên làm active
      if (foundCode.codeSnippets) {
        const languages = Object.keys(foundCode.codeSnippets);
        if (languages.length > 0) {
          setActiveLanguage(languages[0]);
        }
      }
    } else {
      // Không tìm thấy => về Market
      alert("Không tìm thấy đoạn mã này trong Market. Đang chuyển hướng về Market.");
      navigate("/market-code");
    }
  }, [id, navigate, allCodes]);

  // Download
  const handleDownload = () => {
    if (code && code.codeSnippets && activeLanguage) {
      const snippet = code.codeSnippets[activeLanguage];
      const element = document.createElement("a");
      const file = new Blob([snippet], { type: "text/plain" });
      element.href = URL.createObjectURL(file);

      // Xác định extension
      let extension = "txt";
      const lang = activeLanguage.toLowerCase();
      if (lang.includes("python")) extension = "py";
      else if (lang.includes("cpp")) extension = "cpp";
      else if (lang.includes("javascript") || lang.includes("js")) extension = "js";
      else if (lang.includes("css")) extension = "css";

      element.download = `${code.title.replace(/\s+/g, "_")}.${extension}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setNotification("Đoạn mã đã được tải xuống!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Thêm vào Library
  const handleAddToLibrary = () => {
    // Chỉ cho thêm nếu code.price === "Free"
    if (code && code.price === "Free") {
      const libraryCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];
      const exists = libraryCodes.find((item) => item.id === code.id);

      if (!exists) {
        libraryCodes.push({ ...code });
        localStorage.setItem("libraryCodes", JSON.stringify(libraryCodes));
        setNotification(`${code.title} đã được thêm vào thư viện của bạn!`);
      } else {
        setNotification(`${code.title} đã có trong thư viện của bạn.`);
      }
      setTimeout(() => setNotification(""), 3000);
    } else {
      alert("Code này không miễn phí hoặc không thể thêm vào thư viện.");
    }
  };

  // Handle purchase
  const handlePurchase = () => {
    if (!code) return;

    const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
    const alreadyInCart = storedCart.find((g) => g.id === code.id && g.type === "code");

    if (alreadyInCart) {
      alert(`${code.title} is already in your cart.`);
    } else {
      storedCart.push({ ...code, type: "code" });
      localStorage.setItem("Cart", JSON.stringify(storedCart));
      setNotification(`${code.title} has been added to your cart.`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <Container>
      <Navbar />

      {code ? (
        <CodeDetailContainer>
          <CodeHeader>
            <CodeTitle>{code.title}</CodeTitle>
            <Buttons>
              {code.price === "Free" && (
                <DownloadButton onClick={handleDownload}>Download</DownloadButton>
              )}
              {code.price === "Free" && (
                <AddButton onClick={handleAddToLibrary}>Add to Library</AddButton>
              )}
              {code.price !== "Free" && (
                <PurchaseButton onClick={handlePurchase}>Purchase</PurchaseButton>
              )}
              <AddButton onClick={() => navigate(-1)}>Return</AddButton>
            </Buttons>
          </CodeHeader>

          {/* Tags */}
          <Tags>
            {(code.tags || []).map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>

          {/* Mô tả */}
          {code.description && <Description>{code.description}</Description>}

          {/* Nút xem hướng dẫn triển khai */}
          {code.howToImplement && (
            <>
              <ImplementButton onClick={() => setShowImplementation(!showImplementation)}>
                {showImplementation ? "Hide Instructions" : "View Instructions"}
              </ImplementButton>
              {showImplementation && (
                <ImplementationContainer>
                  {code.howToImplement}
                </ImplementationContainer>
              )}
            </>
          )}

          {/* CodeSnippet */}
          {code.codeSnippets && activeLanguage && code.codeSnippets[activeLanguage] && (
            <CodeBlock>
              <SyntaxHighlighter
                language={
                  activeLanguage.toLowerCase().includes("python")
                    ? "python"
                    : activeLanguage.toLowerCase().includes("cpp")
                    ? "cpp"
                    : activeLanguage.toLowerCase().includes("javascript") ||
                      activeLanguage.toLowerCase().includes("js")
                    ? "javascript"
                    : activeLanguage.toLowerCase().includes("css")
                    ? "css"
                    : "text"
                }
                style={github}
                showLineNumbers
              >
                {code.codeSnippets[activeLanguage]}
              </SyntaxHighlighter>
            </CodeBlock>
          )}

          {/* Thông báo */}
          {notification && <Notification>{notification}</Notification>}
        </CodeDetailContainer>
      ) : (
        <div>Loading code details...</div>
      )}
    </Container>
  );
};

export default CodeDetailMarket;
