import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  OrdersContainer,
  OrdersHeader,
  OrdersTitle,
  ViewButton,
} from "./styles/StyledOrders";

// Static orders list
const staticOrders = [
  {
    orderNumber: "PKG-001",
    templateName: "Packing Instructions",
    templateKey: "packingInstructions",
    date: "2023-11-27T10:00:00.000Z",
  },
];

const OrdersList = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleView = (orderNumber) => {
    navigate("/orders/" + orderNumber);
  };

  const tableStyles = {
    backgroundColor: theme === "dark" ? "#1E1E1F" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#212121",
  };

  const headerCellStyles = {
    fontWeight: 600,
    backgroundColor: theme === "dark" ? "#2b2d38" : "#f5f5f5",
    color: theme === "dark" ? "#ffffff" : "#212121",
    borderBottom: theme === "dark" ? "1px solid #4a4a4b" : "1px solid #e0e0e0",
  };

  const bodyCellStyles = {
    color: theme === "dark" ? "#a0a1a4" : "#666666",
    borderBottom: theme === "dark" ? "1px solid #4a4a4b" : "1px solid #e0e0e0",
  };

  return (
    <OrdersContainer>
      <OrdersHeader>
        <OrdersTitle theme={theme}>Orders</OrdersTitle>
      </OrdersHeader>

      <TableContainer component={Paper} sx={tableStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyles}>Order Number</TableCell>
              <TableCell sx={headerCellStyles}>Template</TableCell>
              <TableCell sx={headerCellStyles}>Date</TableCell>
              <TableCell sx={headerCellStyles} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staticOrders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell sx={bodyCellStyles}>{order.orderNumber}</TableCell>
                <TableCell sx={bodyCellStyles}>{order.templateName}</TableCell>
                <TableCell sx={bodyCellStyles}>
                  {formatDate(order.date)}
                </TableCell>
                <TableCell sx={bodyCellStyles} align="center">
                  <ViewButton onClick={() => handleView(order.orderNumber)}>
                    View
                  </ViewButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OrdersContainer>
  );
};

export default OrdersList;
