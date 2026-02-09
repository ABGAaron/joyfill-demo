import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Font Awesome setup
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faFont,
  faAlignJustify,
  faTable,
  faLayerGroup,
  faHeading,
  faParagraph,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

// Add icons to library
library.add(
  faCalendar,
  faFont,
  faAlignJustify,
  faTable,
  faLayerGroup,
  faHeading,
  faParagraph,
  faSquare,
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
