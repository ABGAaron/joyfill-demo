import styled from "styled-components";

export const BuilderContainer = styled.div`
  padding: 10px;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BuilderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TemplateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TemplateLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
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

export const TemplateSelect = styled.select`
  padding: 8px 12px;
  font-size: 14px;
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
  background-color: ${(props) => {
    switch (props.theme) {
      case "dark":
        return "#2b2d38";
      case "brand":
        return "#ffffff";
      default:
        return "#ffffff";
    }
  }};
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
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #2764d5;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background-color: #2764d5;
  color: #ffffff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e4fa8;
  }

  &:disabled {
    background-color: #a0a1a4;
    cursor: not-allowed;
  }
`;

export const JoyDocWrapper = styled.div`
  margin-top: 10px;
  flex: 1;
  overflow: auto;
  min-height: 0;

  /* Force images to fit within their containers */
  [data-field-type="image"] img,
  .joyfill-image img,
  .jf-image img,
  .field-image img {
    object-fit: contain !important;
    max-width: 100% !important;
    max-height: 100% !important;
  }

  /* Override JoyFill right panel scrolling - horizontal scroll, no vertical */
  [class*="RightPanel"],
  [class*="rightPanel"],
  [class*="right-panel"],
  [class*="StyledRightPanelWrapper"],
  [class*="File__StyledRightPanelWrapper"],
  .dIxeNj {
    height: auto !important;
  }

  /* Target by div structure if class selectors don't work */
  & > div > div:last-child,
  & > div > div > div:last-child {
    overflow-x: auto !important;
    overflow-y: hidden !important;
    height: auto !important;
  }
`;
