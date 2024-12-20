// CodeDetailPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// Choose a style that suits your design
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Import languages you need
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";

// Register languages
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);

// Mock data for demonstration purposes
const codeData = [
  {
    id: 1,
    title: "Random Number Generation",
    tags: ["Python", "C++"],
    description:
      "This is often used to create random events, such as enemy movements, loot drops, or spawning locations.",
    codeSnippets: {
      Python: `
import random

def generate_random_number(min_value, max_value):
    return random.randint(min_value, max_value)

# Example usage
print(generate_random_number(1, 100))
      `,
      "C++": `
#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    std::srand(std::time(0)); // Seed for randomness
    int random_number = std::rand() % 100 + 1; // Generates number between 1 and 100
    std::cout << "Random Number: " << random_number << std::endl;
    return 0;
}
      `,
    },
  },
  {
    id: 2,
    title: "Collision Detection",
    tags: ["Python", "C++ (using SDL)"],
    description:
      "A fundamental function in games to check if two objects intersect or collide.",
    codeSnippets: {
      Python: `
def check_collision(rect1, rect2):
    return rect1.colliderect(rect2)

# Example usage with pygame.Rect objects
import pygame
rect1 = pygame.Rect(0, 0, 50, 50)
rect2 = pygame.Rect(30, 30, 50, 50)
print(check_collision(rect1, rect2))
      `,
      "C++ (using SDL)": `
#include <SDL2/SDL.h>
#include <iostream>

bool checkCollision(const SDL_Rect& a, const SDL_Rect& b) {
    // The sides of the rectangles
    int leftA = a.x;
    int rightA = a.x + a.w;
    int topA = a.y;
    int bottomA = a.y + a.h;

    int leftB = b.x;
    int rightB = b.x + b.w;
    int topB = b.y;
    int bottomB = b.y + b.h;

    // If one rectangle is on left side of other
    if (leftA >= rightB || leftB >= rightA) {
        return false;
    }

    // If one rectangle is above other
    if (topA >= bottomB || topB >= bottomA) {
        return false;
    }

    return true;
}

int main() {
    SDL_Rect rect1 = {0, 0, 50, 50};
    SDL_Rect rect2 = {30, 30, 50, 50};
    if (checkCollision(rect1, rect2)) {
        std::cout << "Collision detected!" << std::endl;
    } else {
        std::cout << "No collision." << std::endl;
    }
    return 0;
}
      `,
    },
  },
  {
    id: 3,
    title: "Vector Mathematics (Movement)",
    tags: ["Python", "C++"],
    description:
      "Used to calculate movement and direction of characters or objects in games.",
    codeSnippets: {
      Python: `
import math

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def magnitude(self):
        return math.sqrt(self.x**2 + self.y**2)

    def normalize(self):
        mag = self.magnitude()
        if mag != 0:
            self.x /= mag
            self.y /= mag

    def __str__(self):
        return f"({self.x}, {self.y})"

# Example usage
v = Vector(3, 4)
print("Magnitude:", v.magnitude())
v.normalize()
print("Normalized Vector:", v)
      `,
      "C++": `
#include <iostream>
#include <cmath>

struct Vector {
    float x, y;

    float magnitude() const {
        return std::sqrt(x * x + y * y);
    }

    void normalize() {
        float mag = magnitude();
        if (mag != 0) {
            x /= mag;
            y /= mag;
        }
    }

    void print() const {
        std::cout << "(" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    Vector v = {3.0f, 4.0f};
    std::cout << "Magnitude: " << v.magnitude() << std::endl;
    v.normalize();
    std::cout << "Normalized Vector: ";
    v.print();
    return 0;
}
      `,
    },
  },
  {
    id: 4,
    title: "Game Timer (Frame Update)",
    tags: ["Python (using pygame)", "C++ (using SDL)"],
    description:
      "To control game speed and update game states at a consistent frame rate.",
    codeSnippets: {
      "Python (using pygame)": `
import pygame
import sys

pygame.init()

screen = pygame.display.set_mode((640, 480))
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # Game logic here

    pygame.display.flip()
    clock.tick(60)  # 60 FPS
      `,
      "C++ (using SDL)": `
#include <SDL2/SDL.h>
#include <iostream>

int main() {
    SDL_Init(SDL_INIT_VIDEO);

    SDL_Window* window = SDL_CreateWindow("Game Timer", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, 640, 480, 0);
    SDL_Renderer* renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);

    Uint32 start_time = SDL_GetTicks();
    Uint32 frame_delay = 1000 / 60; // 60 FPS

    while (true) {
        Uint32 frame_start = SDL_GetTicks();

        SDL_Event event;
        while (SDL_PollEvent(&event)) {
            if (event.type == SDL_QUIT) {
                goto end;
            }
        }

        // Game logic and rendering here

        SDL_RenderClear(renderer);
        // Render game objects here
        SDL_RenderPresent(renderer);

        Uint32 frame_time = SDL_GetTicks() - frame_start;
        if (frame_delay > frame_time) {
            SDL_Delay(frame_delay - frame_time);
        }

        Uint32 elapsed_time = SDL_GetTicks() - start_time;
        std::cout << "Time elapsed: " << elapsed_time << "ms" << std::endl;
    }

    end:
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();
    return 0;
}
      `,
    },
  },
  // Add more code entries as needed
];

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

const slideIn = keyframes`
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
  background-color: #f6f8fa;
  color: #24292e;
  min-height: 100vh;
  padding: 20px;
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
  top: 40px;
  left: 0;
  background-color: #24292e;
  border-radius: 6px;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 100;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DropdownItem = styled.a`
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(40, 167, 69, 0.5);

  &:hover {
    background-color: #218838;
  }
`;

const BackButton = styled(Link)`
  padding: 10px 20px;
  background-color: #6c757d;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(108, 117, 125, 0.5);

  &:hover {
    background-color: #5a6268;
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
`;

// Tabs for Code Snippets
const LanguageTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const LanguageTab = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#0366d6" : "#e1e4e8")};
  color: ${(props) => (props.active ? "#fff" : "#24292e")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#0356b6" : "#d1d5da")};
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

const CodeDetailPage = () => {
  const { id } = useParams(); // Get the code ID from the URL
  const navigate = useNavigate();

  const [code, setCode] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("");
  const [notification, setNotification] = useState("");

  // Fetch the specific code data based on ID
  useEffect(() => {
    const foundCode = codeData.find((item) => item.id === parseInt(id));
    if (foundCode) {
      setCode(foundCode);
      // Set default active language to the first available
      const languages = Object.keys(foundCode.codeSnippets);
      if (languages.length > 0) {
        setActiveLanguage(languages[0]);
      }
    } else {
      // If code not found, redirect to GameLibrary or show an error
      navigate("/library-code");
    }
  }, [id, navigate]);

  // Function to handle downloading the code (for demonstration, we'll just alert)
  const handleDownload = () => {
    alert("Downloading code...");
    // Implement actual download functionality here
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
        </CodeDetailContainer>
      )}

      {/* Notification */}
      {notification && <Notification>{notification}</Notification>}
    </Container>
  );
};

export default CodeDetailPage;
