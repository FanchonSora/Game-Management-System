import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";

// Styled Components (unchanged)
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  padding: 2rem;
  background-color: #1e1e2e;
  color: #c7d5e0;
  min-height: 100vh;
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

const Form = styled.form`
  position: relative;
  background-color: #292e49;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #c7d5e0;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #66c0f4;
  border-radius: 4px;
  background-color: #1e1e2e;
  color: #c7d5e0;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #66c0f4;
  border-radius: 4px;
  background-color: #1e1e2e;
  color: #c7d5e0;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #4c9900;
  border: none;
  border-radius: 5px;
  color: #ffff;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
  position: absolute;
  bottom: 33px;

  &:hover {
    background-color: #00cc00;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(102, 192, 244, 0.5);
  }
`;

const BackButton = styled.button`
  align-self: flex-start;
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


const ErrorMessage = styled.p`
  color: #ff4d6d;
  font-size: 0.9rem;
`;

const stripePromise = loadStripe("your-public-key-from-stripe");

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!paymentMethod || !cardNumber || !expiryDate || !securityCode) {
      setError("All fields are required.");
      return;
    }

    // Load Stripe
    const stripe = await stripePromise;
    const { token, error: stripeError } = await stripe.createToken({
      number: cardNumber,
      exp_month: expiryDate.split("/")[0],
      exp_year: "20" + expiryDate.split("/")[1], // For MM/YY format
      cvc: securityCode,
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    const response = await fetch("/your-server-endpoint/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token.id }),
    });

    const result = await response.json();
    if (result.success) {
      navigate("/SuccessPage");
    } else {
      setError("Payment failed, please try again.");
    }
  };

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbLink onClick={() => navigate("/home")}>Home</BreadcrumbLink>
        <span> &gt; </span> {/* Use &gt; for ">" */}
        <span>Your Shopping Cart</span>
      </Breadcrumbs>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Label htmlFor="paymentMethod">Select Payment Method</Label>
        <Select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">-- Choose Payment Method --</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
        </Select>

        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="Enter your card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />

        <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
        <Input
          id="expiryDate"
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <Label htmlFor="securityCode">Security Code</Label>
        <Input
          id="securityCode"
          type="password"
          placeholder="Security Code"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
          required
        />

        <BackButton onClick={() => navigate("/CartPage")}>Back</BackButton>
        <SubmitButton type="submit">Pay Now</SubmitButton>
      </Form>
    </Container>
  );
};

export default PaymentPage;
