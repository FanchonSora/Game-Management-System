// src/pages/LibraryCode.jsx

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import libraryCodes from "../../data/libraryCodes"; // Import codeData từ file mới tạo
import CodeCard from "../../components/CodeCard"; // Import CodeCard component
import Navbar from "../../components/Navbar"; // Import Navbar component

// Keyframes for Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled Components

// Container
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 80px 20px 20px 20px; /* Padding top để không che Navbar fixed */
  animation: ${fadeIn} 0.5s ease-out;
`;

// Header Section
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
  border: 3px solid #0366d6;
`;

const ProfileInfo = styled.div``;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 28px;
  color: #0366d6;
`;

const ProfileUsername = styled.p`
  margin: 5px 0 0 0;
  color: #586069;
  font-size: 18px;
`;

// Tabs
const Tabs = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#0366d6" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#0366d6")};
  border: 1px solid #d0d7de;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #0366d6;
    color: #fff;
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
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 16px;
`;

// Code/List
const CodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

// Notification (Optional)
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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

// LibraryCode Component
const LibraryCode = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("All");

  // State for added codes
  const [addedCodes, setAddedCodes] = useState([]);

  // State for notification
  const [notification, setNotification] = useState("");

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Load added codes from localStorage on mount
  useEffect(() => {
    localStorage.setItem("libraryCodes", JSON.stringify(libraryCodes));

    const storedCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];
    setAddedCodes(storedCodes);
  }, []);

  // Hàm xóa code khỏi thư viện
  const handleRemoveCode = (code) => {
    const updatedCodes = addedCodes.filter((c) => c.id !== code.id);
    setAddedCodes(updatedCodes);
    localStorage.setItem("libraryCodes", JSON.stringify(updatedCodes));
    setNotification(`${code.title} đã được xóa khỏi thư viện của bạn!`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Debounce the search query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    // Cleanup the timeout if searchQuery changes before 300ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Filtering codes based on active tab and debounced search query
  const filteredCodes = libraryCodes.filter((code) => {
    const matchesCategory =
      activeTab === "All" || code.category === activeTab;
    const query = debouncedSearchQuery.toLowerCase();
    const matchesSearch =
      code.title.toLowerCase().includes(query) ||
      code.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Function to handle adding code to library
  const handleAddCode = (code) => {
    if (!addedCodes.find((c) => c.id === code.id)) {
      const updatedCodes = [...addedCodes, code];
      setAddedCodes(updatedCodes);
      localStorage.setItem("libraryCodes", JSON.stringify(updatedCodes));
      setNotification(`${code.title} đã được thêm vào thư viện của bạn!`);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <Container>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Header Section */}
      <Header>
        <ProfilePicture
          src="avatar.jpg" 
          alt="Profile"
        />
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

      {/* Code/List */}
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
                buttonText="View"
                buttonLink={`/library-code/${code.id}`}
                isAdded={isAdded}
                onAddToLibrary={() => handleAddCode(code)}
                // Thêm onRemoveFromLibrary
                onRemoveFromLibrary={() => handleRemoveCode(code)}
              />
            );
          })
        ) : (
          <p>No repositories found matching your search.</p>
        )}
      </CodeList>

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default LibraryCode;
