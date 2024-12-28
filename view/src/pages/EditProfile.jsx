import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User, Lock, Camera } from "lucide-react"; // Assuming you have lucide-react installed

const EditProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("general");
  const [errors, setErrors] = useState({ username: false, email: false, general: "" });
  const [formData, setFormData] = useState({
    username: "khanhngan1491",
    name: "@khanhngan",
    email: "@khanhngan",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
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

  return (
    <Body>
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
        </Sidebar>
        <Content>
          <Heading>Edit Profile</Heading>
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
                    borderColor: errors.username ? "#ff4d4f" : "#66c0f4",
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
                    borderColor: errors.email ? "#ff4d4f" : "#66c0f4",
                  }}
                />
              </InputContainer>

              <Button type="submit">Save Changes</Button>
            </Form>
          )}

          {activeSection === "avatar" && (
            <AvatarSection>
              <SectionTitle>Avatar</SectionTitle>
              <AvatarPreview>
                <img src={formData.avatar} alt="Avatar" />
              </AvatarPreview>
              <UploadButton>
                <label htmlFor="avatar-upload">
                  <Camera size={24} /> Upload Avatar
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

// Styled-components for consistency with EditProfile
const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #1b2838, #0f171e);
  color: #c7d5e0;
  font-family: "Arial", sans-serif;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #2c3e50;
  border-radius: 10px;
  padding: 10px;
`;

const SidebarItem = styled.div`
  color: ${(props) => (props.active ? "#66c0f4" : "#c7d5e0")};
  font-size: 18px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    color: #66c0f4;
  }
`;

const Content = styled.div`
  width: 70%;
  padding: 20px;
  background: rgba(27, 40, 56, 0.9);
  border-radius: 15px;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #66c0f4;
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #66c0f4;
  margin-bottom: 10px;
  margin-top: 30px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #c7d5e0;
  margin-bottom: 8px;
  display: block;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #66c0f4;
  border-radius: 5px;
  background-color: #1b2838;
  color: #c7d5e0;
  font-size: 14px;
  box-sizing: border-box;

  ::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
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
  }
`;

const UploadButton = styled.div`
  display: inline-block;
  background-color: #4a90e2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
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
  background-color: #4a90e2;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ab8;
  }
`;

export default EditProfile;