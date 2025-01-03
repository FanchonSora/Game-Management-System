import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CodeCard from "../../components/CodeCard"; // Import CodeCard component
import Navbar from "../../components/Navbar"; // Import Navbar component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

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

// Styled Components

// Container
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #2a2a3d; /* Dark background */
  color: #c7d5e0; /* Light text color */
  min-height: 100vh;
  padding: 80px 20px 20px 20px; /* Padding top to avoid overlapping Navbar */
  animation: ${fadeIn} 0.5s ease-out;
  /* Overlay for better text readability */
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  /* Ensure content is above the overlay */
  > * {
    position: relative;
    z-index: 1;
  }
`;

// Header Section
const Header = styled.div`
  display: flex;
  margin-top:2rem;
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
  color:rgb(199, 90, 246);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const ProfileUsername = styled.p`
  margin: 5px 0 0 0;
  color: rgb(255, 255, 255)gray color */
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
  background-color: ${(props) => (props.active ? "rgb(199, 90, 246)" : "#2d333b")}; /* Light blue active, dark inactive */
  color: ${(props) => (props.active ? "#fff" : "#c7d5e0")}; /* Dark text for active, light text for inactive */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color:rgb(184, 81, 228);
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
  border: 1px solid rgb(199, 90, 246); /* Light blue border */
  border-radius: 6px;
  font-size: 16px;
  background-color: #2a2a3d; /* Darker blue background */
  color: #c7d5e0; /* Light text */
  outline: none;

  &::placeholder {
    color: #aab2bd;
  }

  &:focus {
    border-color:rgb(199, 90, 246); /* Slightly darker blue on focus */
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
  background-color: rgb(199, 90, 246); /* Green background for success */
  color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-out, ${fadeOut} 0.3s ease-out 2.5s forwards;
  opacity: 1;
`;

// Placeholder message
const PlaceholderMessage = styled.p`
  color: #c7d5e0;
  text-align: center;
  font-size: 1.2rem;
`;

// LibraryCode Component
const LibraryCode = () => {
  const navigate = useNavigate(); // Using the navigate hook for programmatic navigation
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("All");

  // State for added codes
  const [addedCodes, setAddedCodes] = useState([]);

  // State for notification
  const [notification, setNotification] = useState("");

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const libraryCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];

  // Load added codes from localStorage on mount
  useEffect(() => {
    setAddedCodes(libraryCodes);
  }, [libraryCodes]);

  // Function to remove code from library
  const handleRemoveCode = (code) => {
    const updatedCodes = addedCodes.filter((c) => c.id !== code.id);
    setAddedCodes(updatedCodes);
    localStorage.setItem("libraryCodes", JSON.stringify(updatedCodes));
    setNotification(`${code.title} is removed from your library!`);
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
  const filteredCodes = addedCodes.filter((code) => {
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
      setNotification(`${code.title} is added to your library!`);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Navigate to CodeDetailPage when a code is clicked
  const handleNavigateToDetail = (codeId) => {
    navigate(`/library-code/${codeId}`);
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
                buttonText={isAdded ? "Remove" : "View"} // Change button text based on state
                buttonLink={`/library-code/${code.id}`}
                isAdded={isAdded}
                onAddToLibrary={() => handleAddCode(code)}
                onRemoveFromLibrary={() => handleRemoveCode(code)}
                onClick={() => handleNavigateToDetail(code.id)} // Navigate to the CodeDetailPage
              />
            );
          })
        ) : (
          <PlaceholderMessage>No repositories found matching your search.</PlaceholderMessage>
        )}
      </CodeList>

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default LibraryCode;
