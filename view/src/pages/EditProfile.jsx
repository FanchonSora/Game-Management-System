// File: src/pages/EditProfile.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Camera } from "lucide-react"; // Assuming you have lucide-react installed
import NavBar from "../components/Navbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("general");
  const [errors, setErrors] = useState({ username: false, email: false, general: "" });
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: "avatar.jpg",
    backgroundImage: "profilebanner.jpg",
    country: "VN",
  });

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/profile/${username}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: data.username,
            name: data.name,
            email: data.email,
            country: data.country,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            avatar: data.profile_picture,
            backgroundImage: data.profile_banner,
          });
        } else {
          alert("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("An error occurred while fetching the profile data.");
      }
    };
  
    if (username) {
      fetchProfileData();
    } else {
      setError("No user logged in");
      setLoading(false);
    }
  }, [username]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      country: formData.country,
      avatar: formData.avatar,
      backgroundImage: formData.backgroundImage,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        throw new Error(errorData.detail || "Failed to update profile");
      }
  
      const data = await response.json();
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, backgroundImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Body>
      <NavBar />
      <PathLabel>
        <span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
          {formData.name}
        </span>{" "}
        &raquo;{" "}
        <span onClick={() => navigate("/edit-profile", { replace: true })} style={{ cursor: "pointer" }}>
          Edit Profile
        </span>
      </PathLabel>
      <Container>
        <Sidebar>
          <SidebarItem active={activeSection === "general"} onClick={() => setActiveSection("general")}>
            General
          </SidebarItem>
          <SidebarItem active={activeSection === "avatar"} onClick={() => setActiveSection("avatar")}>
            Avatar
          </SidebarItem>
          <SidebarItem active={activeSection === "account"} onClick={() => setActiveSection("account")}>
            Account
          </SidebarItem>
          <SidebarItem active={activeSection === "background"} onClick={() => setActiveSection("background")}>
            Background
          </SidebarItem>
        </Sidebar>
        <Content>
          {activeSection === "general" && (
            <Form onSubmit={handleSaveChanges}>
              <SectionTitle>General</SectionTitle>
              <InputContainer>
                <Label>Username</Label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style={{
                    borderColor: errors.username ? "#ff4d4f" : "#c759f6", // Updated border color
                  }}
                />
              </InputContainer>

              <InputContainer>
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </InputContainer>

              <InputContainer>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    borderColor: errors.email ? "#ff4d4f" : "#c759f6", // Updated border color
                  }}
                />
              </InputContainer>

              <InputContainer>
                <Label>Country</Label>
                <Select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="VN">Vietnam</option>
                </Select>
              </InputContainer>

              <Button type="submit">Save Changes</Button>
            </Form>
          )}

          {activeSection === "avatar" && (
            <AvatarSection>
              <SectionTitle>Avatar</SectionTitle>
              <AvatarPreview>
                {/* Display a fallback image if no avatar is set */}
                <img src={formData.avatar || "https://via.placeholder.com/150"} alt="Avatar" />
              </AvatarPreview>
              <UploadButton>
                <label htmlFor="avatar-upload">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </UploadButton>
            </AvatarSection>
          )}

          {activeSection === "background" && (
            <BackgroundSection>
              <SectionTitle>Background</SectionTitle>

              <BackgroundPreview>
                <img
                  src={formData.backgroundImage || "https://via.placeholder.com/1200x400"} // Fallback image if no background is set
                  alt="Background"
                />
              </BackgroundPreview>

              <UploadButton>
                <label htmlFor="background-upload">
                  Upload Background
                </label>
                <input
                  type="file"
                  id="background-upload"
                  accept="image/*"
                  onChange={handleBackgroundChange}
                  style={{ display: "none" }}
                />
              </UploadButton>
            </BackgroundSection>
          )}

          {activeSection === "account" && (
            <Form onSubmit={handleSaveChanges}>
              <SectionTitle>Change Account</SectionTitle>

              <InputContainer>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                />
              </InputContainer>

              <InputContainer>
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
              </InputContainer>

              <InputContainer>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </InputContainer>

              <Button type="submit">Save Changes</Button>
            </Form>
          )}
        </Content>
      </Container>
    </Body>
  );
};

export default EditProfile;

// Styled-components for consistency with EditProfile
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #1e1e2e; /* Updated to match HomePage's rgba overlay */
  border-radius: 10px;
`;

const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #2a2a3d; /* Updated gradient to match HomePage's dark theme */
  color: #c7d5e0; /* Updated text color to match HomePage */
  font-family: "Roboto", sans-serif; /* Changed to match HomePage's font */
  position: relative;
  overflow: hidden;

  /* Overlay similar to HomePage for consistency */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6); /* Consistent overlay */
    z-index: 0;
  }

  /* Ensure content is above the overlay */
  > * {
    position: relative;
    z-index: 1;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-direction: row; /* Ensures sidebar and content are side by side */
  max-width: 1200px;
  margin: 0 auto; /* Centers the container */
`;

const PathLabel = styled.div`
  font-size: 16px;
  color: #c759f6; /* Updated to match HomePage's button color */
  margin: 20px auto 10px auto;
  font-weight: bold;
  display: block;
  text-align: center;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #2a2a3d; /* Updated to match HomePage's card background */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Added shadow for depth */
`;

const SidebarItem = styled.div`
  color:rgb(255, 255, 255); /* Updated text color */
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "rgb(199, 90, 246)" : "transparent")}; /* Updated active background */

  &:hover {
    background-color:rgb(199, 90, 246); /* Consistent hover effect */
  }
`;

const Content = styled.div`
  width: 75%; /* Adjusted width for better responsiveness */
  padding: 20px;
  background: #2a2a3d; /* Updated to match HomePage's form background */
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Added shadow for consistency */
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #c759f6; /* Updated to match HomePage's button color */
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #c7d5e0; /* Updated label color */
  margin-bottom: 8px;
  display: block;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #c759f6; /* Updated border color */
  border-radius: 5px;
  background-color: #1e1e2e; /* Updated input background */
  color: #c7d5e0; /* Updated text color */
  font-size: 14px;
  box-sizing: border-box;

  ::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    outline: none;
    border-color: #c759f6; /* Consistent focus color */
  }
`;

const AvatarSection = styled.div`
  text-align: center;
`;

const AvatarPreview = styled.div`
  margin-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid #c759f6; /* Added border to match theme */
  }
`;

const UploadButton = styled.div`
  display: inline-block;
  background-color: #c759f6; /* Updated to match HomePage's button color */
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #b850e4; /* Slightly darker on hover */
  }

  label {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: #c759f6; /* Updated to match HomePage's button color */
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #b850e4; /* Slightly darker on hover */
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #c759f6; /* Updated border color */
  border-radius: 5px;
  background-color: #1e1e2e; /* Updated select background */
  color: #c7d5e0; /* Updated text color */
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #c759f6; /* Consistent focus color */
  }
`;

const BackgroundSection = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const BackgroundPreview = styled.div`
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover; /* Ensures the image covers the container without distortion */
    border-radius: 10px;
    border: 2px solid #c759f6; /* Added border to match theme */
  }
`;
