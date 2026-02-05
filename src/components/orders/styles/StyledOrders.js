import styled from "styled-components";

export const OrdersContainer = styled.div`
  padding: 20px;
`;

export const OrdersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const OrdersTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#ffffff";
      case "brand":
        return "#212121";
      default:
        return "#212121";
    }
  }};
`;

export const OrdersTableContainer = styled.div`
  background-color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#1E1E1F";
      case "brand":
        return "#ffffff";
      default:
        return "#ffffff";
    }
  }};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#6f6f71";
      default:
        return "#a0a1a4";
    }
  }};
  font-size: 16px;
`;

export const ViewButton = styled.button`
  padding: 6px 16px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: #2764d5;
  color: #ffffff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e4fa8;
  }
`;

// Order Detail Styles
export const OrderDetailContainer = styled.div`
  padding: 20px;
`;

export const OrderDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid
    ${(props) => {
      switch (props.theme) {
        case "dark":
          return "#4a4a4b";
        case "brand":
          return "#fb8d21";
        default:
          return "#e2e2e2";
      }
    }};
  background-color: transparent;
  color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#ffffff";
      case "brand":
        return "#212121";
      default:
        return "#212121";
    }
  }};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => {
      switch (props.theme) {
        case "dark":
          return "#2b2d38";
        case "brand":
          return "#ffecd4";
        default:
          return "#f5f5f5";
      }
    }};
  }
`;

export const ExportButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background-color: #28a745;
  color: #ffffff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #a0a1a4;
    cursor: not-allowed;
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const OrderInfoItem = styled.span`
  font-size: 14px;
  color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#a0a1a4";
      default:
        return "#666666";
    }
  }};
`;

export const JoyDocWrapper = styled.div`
  margin-top: 20px;
`;

export const NotFoundMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#6f6f71";
      default:
        return "#a0a1a4";
    }
  }};
  font-size: 18px;
`;
