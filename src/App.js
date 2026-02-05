import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Builder from "./components/builder/Builder";
import OrdersList from "./components/orders/OrdersList";
import OrderDetail from "./components/orders/OrderDetail";
import styled from "styled-components";

// Create a context to manage theme and mode state
export const ThemeContext = createContext("null");

// Styled component for the main app container
const AppContainer = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  padding-left: 145px;
`;

// Styled component for the content area
const ContentArea = styled.div`
  min-height: calc(100vh - 60px);
`;

// Styled component for the welcome message on home page
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 20px;
`;

const WelcomeTitle = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#212121")};
`;

const WelcomeSubtitle = styled.p`
  font-size: 16px;
  color: ${(props) => (props.theme === "dark" ? "#a0a1a4" : "#666666")};
`;

const App = () => {
  // State hooks for theme and mode
  const [theme, setTheme] = useState("light");
  const [mode, setMode] = useState("edit");
  const location = useLocation();

  // Check if current page is orders page
  const isOrdersPage =
    location.pathname === "/" || location.pathname.startsWith("/orders");

  // Event handler to toggle mode
  const toggleMode = (mode) => {
    setMode(mode);
  };

  // Event handler to toggle theme
  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  // Update background color based on theme changes
  useEffect(() => {
    let backgroundColor;
    switch (theme) {
      case "light":
      case "brand":
        backgroundColor = "#e8e8e8";
        break;
      default:
        backgroundColor = "#343435";
        break;
    }
    document.documentElement.style.backgroundColor = backgroundColor;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode, toggleMode }}>
      <AppContainer className="app">
        {!isOrdersPage && <Header />}
        <Sidebar />
        <ContentArea>
          <Routes>
            <Route path="/" element={<OrdersList />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:orderNumber" element={<OrderDetail />} />
          </Routes>
        </ContentArea>
      </AppContainer>
    </ThemeContext.Provider>
  );
};

export default App;
