import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa'; // Import Cart Icon

const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #2a2a3d;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Dropdown = styled.div`
  position: relative;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #c7d5e0;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3a3a5e;
  }

  &:focus {
    outline: none;
    background-color: #3a3a5e;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background-color: #2a2a3d;
  border: 1px solid #444;
  border-radius: 4px;
  min-width: 150px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #c7d5e0;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3a3a5e;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #c7d5e0;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s ease;

  &.active {
    background-color: #3a3a5e;
  }

  &:hover {
    background-color: #3a3a5e;
  }
`;

const CartIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CartIcon = styled(FaShoppingCart)`
  font-size: 24px;
  color: #c7d5e0;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -7px;
  background-color: #e74c3c;
  color: white;
  font-size: 10px;  /* Even smaller font size */
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;  /* Smaller padding */
`;

const Navbar = () => {
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State to hold the cart count

  const marketRef = useRef(null);
  const libraryRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate(); // To navigate to the cart page

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (marketRef.current && !marketRef.current.contains(event.target)) {
        setMarketDropdownOpen(false);
      }
      if (libraryRef.current && !libraryRef.current.contains(event.target)) {
        setLibraryDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update cart count from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('Cart')) || [];
    setCartCount(storedCart.length); // Set cart count based on localStorage
  }, []);

  return (
    <NavbarContainer>
      <NavLinks>
        {/* Market Dropdown */}
        <Dropdown ref={marketRef}>
          <NavButton
            onClick={() => setMarketDropdownOpen(!isMarketDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isMarketDropdownOpen}
          >
            Market
          </NavButton>
          {isMarketDropdownOpen && (
            <DropdownMenu>
              <DropdownItem to="/market-game">Market Game</DropdownItem>
              <DropdownItem to="/market-code">Market Code</DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>

        {/* Community Link */}
        <StyledNavLink to="/community">Community</StyledNavLink>

        {/* Library Dropdown */}
        <Dropdown ref={libraryRef}>
          <NavButton
            onClick={() => setLibraryDropdownOpen(!isLibraryDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isLibraryDropdownOpen}
          >
            Library
          </NavButton>
          {isLibraryDropdownOpen && (
            <DropdownMenu>
              <DropdownItem to="/home">Home</DropdownItem>
              <DropdownItem to="/library-code">Library Code</DropdownItem>
              <DropdownItem to="/library-game">Library Game</DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>

        {/* Personal Profile Dropdown */}
        <Dropdown ref={profileRef}>
          <NavButton
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isProfileDropdownOpen}
          >
            Personal Profile
          </NavButton>
          {isProfileDropdownOpen && (
            <DropdownMenu>
              <DropdownItem to="/profile">Profile</DropdownItem>
              <DropdownItem to="/friends">Friends</DropdownItem>
              <DropdownItem to="/badges">Badges</DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>

        {/* Cart Icon */}
        <CartIconWrapper onClick={() => navigate("/CartPage")}>
          <CartIcon />
          {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
        </CartIconWrapper>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
