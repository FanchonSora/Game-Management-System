import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CodeCard from "../../components/CodeCard"; // Import CodeCard component
import Navbar from "../../components/Navbar";      // Import Navbar component
import { useNavigate } from "react-router-dom";   // Import useNavigate hook

// Keyframes for Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// ========== Styled Components ==========

// Container
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #2a2a3d; /* Dark background */
  color: #c7d5e0;            /* Light text color */
  min-height: 100vh;
  padding: 80px 20px 20px 20px; /* Padding top để tránh đè lên Navbar */
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

// Header Section
const Header = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

// Profile Picture
const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
  border: 3px solid rgb(199, 90, 246);
`;

// Profile Information
const ProfileInfo = styled.div``;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 28px;
  color: rgb(199, 90, 246);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const ProfileUsername = styled.p`
  margin: 5px 0 0 0;
  color: gray; 
  font-size: 18px;
`;

// Tabs
const Tabs = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "rgb(199, 90, 246)" : "#2d333b")};
  color: ${(props) => (props.active ? "#fff" : "#c7d5e0")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

// Search Bar
const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px 20px;
  border: 1px solid rgb(199, 90, 246);
  border-radius: 6px;
  font-size: 16px;
  background-color: #2a2a3d;
  color: #c7d5e0;
  outline: none;

  &::placeholder {
    color: #aab2bd;
  }

  &:focus {
    border-color: rgb(199, 90, 246);
    box-shadow: 0 0 5px rgb(199, 90, 246);
  }
`;

// Code/List
const CodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

// Notification
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgb(199, 90, 246);
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

// Placeholder message
const PlaceholderMessage = styled.p`
  color: #c7d5e0;
  text-align: center;
  font-size: 1.2rem;
`;

// ========== Component chính: LibraryCode ==========

const LibraryCode = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [addedCodes, setAddedCodes] = useState([]);
  const [notification, setNotification] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Lấy dữ liệu từ localStorage
  const libraryCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];

  // Load added codes từ localStorage lúc mount
  useEffect(() => {
    setAddedCodes(libraryCodes);
  }, [libraryCodes]);

  // Xoá code khỏi library
  const handleRemoveCode = (code) => {
    const updatedCodes = addedCodes.filter((c) => c.id !== code.id);
    setAddedCodes(updatedCodes);
    localStorage.setItem("libraryCodes", JSON.stringify(updatedCodes));
    setNotification(`${code.title} is removed from your library!`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Thêm code vào library
  const handleAddCode = (code) => {
    if (!addedCodes.find((c) => c.id === code.id)) {
      const updatedCodes = [...addedCodes, code];
      setAddedCodes(updatedCodes);
      localStorage.setItem("libraryCodes", JSON.stringify(updatedCodes));
      setNotification(`${code.title} is added to your library!`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Lọc code theo tab + search
  const filteredCodes = addedCodes.filter((code) => {
    const matchesCategory = (activeTab === "All" || code.category === activeTab);
    const query = debouncedSearchQuery.toLowerCase();
    const matchesSearch =
      code.title.toLowerCase().includes(query) ||
      code.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Navigate sang trang detail
  const handleNavigateToDetail = (codeId) => {
    navigate(`/library-code/${codeId}`);
  };

  return (
    <Container>
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header>
        <ProfilePicture src="avatar.jpg" alt="Profile" />
        <ProfileInfo>
          <ProfileName>Fanchon_Sora</ProfileName>
          <ProfileUsername>@FanchonSora</ProfileUsername>
        </ProfileInfo>
      </Header>

      {/* Tabs */}
      <Tabs>
        {["All", "Function", "Project", "Package"].map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </Tabs>

      {/* Search Bar */}
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Find a repository..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search Repositories"
        />
      </SearchBar>

      {/* Danh sách Code */}
      <CodeList>
        {filteredCodes.length > 0 ? (
          filteredCodes.map((code) => {
            const isAdded = addedCodes.some((c) => c.id === code.id);
            return (
              <CodeCard
                key={code.id}
                image={code.image}
                title={code.title}
                description={code.description}
                tags={code.tags}
                isAdded={isAdded}
                onAddToLibrary={() => handleAddCode(code)}
                onRemoveFromLibrary={() => handleRemoveCode(code)}
                onView={() => handleNavigateToDetail(code.id)} // CHỈ gọi khi bấm “View”
              />
            );
          })
        ) : (
          <PlaceholderMessage>
            No repositories found matching your search.
          </PlaceholderMessage>
        )}
      </CodeList>

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default LibraryCode;
