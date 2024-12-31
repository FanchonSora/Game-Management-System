import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

// Styled Components

// Container for Cart Page
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
`;

const CartContainer = styled.div`
 font-family: "Roboto", sans-serif;
  padding: 2rem;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-grow: 1; 
  margin-bottom: 1rem;
`;

// Title Section (Breadcrumbs)
const Breadcrumbs = styled.div`
  font-size: 1.2rem;
  color: #c7d5e0;
  margin-bottom: 2rem;
`;

const BreadcrumbLink = styled.span`
  cursor: pointer;
  color: #66c0f4;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

// Left Section for Cart Items
const CartItemsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem; /* Space for the button */
`;

// Right Section for Total and Checkout Button
const CheckoutSection = styled.div`
  flex: 0.5; 
  background-color: #292e49;
  padding: 1rem; 
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100px;
  min-width: 250px;
  overflow-y: auto;
`;

// Cart Item
const CartItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #292e49;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

// Cart Item Image
const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
`;

// Cart Item Details
const CartItemDetails = styled.div`
  flex-grow: 1;
`;

// Cart Item Title
const CartItemTitle = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin: 0;
`;

// Cart Item Price
const CartItemPrice = styled.p`
  font-size: 1rem;
  color: #ff4d6d;
  margin: 0;
`;

// Remove Button
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d6d;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Continue Shopping Button
const ContinueShoppingButton = styled.button`
  background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
  width: 20%; 
  align-self: flex-start; 
  
  &:hover {
    background-color: #5aa8e6;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(102, 192, 244, 0.5);
  }
`;

// Total Price Section
const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

// Checkout Button
const CheckoutButton = styled.button`
background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #5aa8e6;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(102, 192, 244, 0.5);
  }
`;

// CartPage Component
const CartPage = () => {
  const navigate = useNavigate();

  // Sample Cart Data (In real-world, this would come from a global state or API)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Asterigos: Curse of the Stars",
      price: 39.99,
      image: "/game/Asterigos.jpg",
    },
    {
      id: 2,
      title: "Elden Ring",
      price: 59.99,
      image: "/game/Elden Ring.jpg",
    },
    {
      id: 3,
      title: "Cyberpunk 2077",
      price: 49.99,
      image: "/game/Cyberpunk 2077.jpg",
    },
  ]);

  // Remove Item from Cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate Total Price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Checkout Handler (navigate to checkout page or handle logic)
  const handleCheckout = () => {
    // Navigate to checkout page (you can add a route for this)
    navigate("/checkout");
  };

  // Navigate to Home Page
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs>
        <BreadcrumbLink onClick={handleGoHome}>Home</BreadcrumbLink>
        <span> &gt; </span> {/* Use &gt; for ">" */}
        <span>Your Shopping Cart</span>
      </Breadcrumbs>

      <CartContainer>
        <CartItemsSection>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <CartItemImage src={item.image} alt={item.title} />
              <CartItemDetails>
                <CartItemTitle>{item.title}</CartItemTitle>
                <CartItemPrice>${item.price.toFixed(2)}</CartItemPrice>
              </CartItemDetails>
              <RemoveButton onClick={() => removeItem(item.id)}>
                <FaTrashAlt />
              </RemoveButton>
            </CartItem>
          ))}

          <ContinueShoppingButton onClick={() => navigate("/HomePage")}>
            Continue Shopping
          </ContinueShoppingButton>
        </CartItemsSection>

        <CheckoutSection>
          <TotalSection>
            <span>Estimated Total</span>
            <span>${calculateTotal()}</span>
          </TotalSection>
          <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
        </CheckoutSection>
      </CartContainer>
    </Container>
  );
};

export default CartPage;
