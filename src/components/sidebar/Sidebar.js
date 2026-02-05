import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { ThemeContext } from "../../App";

// Import styled components for Sidebar styling
import {
  SidebarContainer,
  SidebarHeader,
  ProductName,
  SidebarIcon,
  SubHeader,
  SidebarListContainer,
  SidebarListItem,
} from "./styles/StyledSidebar";

const Sidebar = () => {
  // Retrieve theme from ThemeContext
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a route is active
  const isActive = (path) => {
    if (path === "/builder") {
      return location.pathname === "/builder";
    }
    if (path === "/orders") {
      return location.pathname.startsWith("/orders");
    }
    return false;
  };

  return (
    // Sidebar container with dynamic theme styling
    <SidebarContainer theme={theme}>
      {/* Sidebar header with product name and icon */}
      <SidebarHeader>
        <SidebarIcon theme={theme} size="30px" />
        <ProductName theme={theme}>Acme Inc.</ProductName>
      </SidebarHeader>

      {/* Container for the navigation menu */}
      <SidebarListContainer>
        {/* Subheader for the menu */}
        <SubHeader theme={theme}>Menu</SubHeader>

        {/* Orders menu item */}
        <SidebarListItem
          className={isActive("/orders") ? "active-l" : ""}
          onClick={() => navigate("/orders")}
          theme={theme}
        >
          <div className="icon-container">
            <MdIcons.MdListAlt size={17} />
          </div>
          <span>Orders</span>
        </SidebarListItem>

        {/* PDF Builder menu item */}
        <SidebarListItem
          className={isActive("/builder") ? "active-l" : ""}
          onClick={() => navigate("/builder")}
          theme={theme}
        >
          <div className="icon-container">
            <FaIcons.FaFilePdf size={17} />
          </div>
          <span>PDF Builder</span>
        </SidebarListItem>
      </SidebarListContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
