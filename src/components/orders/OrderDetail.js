import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JoyDoc } from "@joyfill/components";
import { ThemeContext } from "../../App";
import { themes } from "../../themes";
import { data } from "../../data";
import { initialData } from "../../initial-data";
import { fieldOptions } from "../../field-options";
import html2pdf from "html2pdf.js";
import {
  OrderDetailContainer,
  OrderDetailHeader,
  BackButton,
  ExportButton,
  OrderInfo,
  OrderInfoItem,
  JoyDocWrapper,
  NotFoundMessage,
} from "./styles/StyledOrders";

// Static orders lookup
const staticOrders = {
  "PKG-001": {
    orderNumber: "PKG-001",
    templateName: "Packing Instructions",
    templateKey: "packingInstructions",
    date: "2023-11-27T10:00:00.000Z",
  },
};

/**
 * Generate a unique ObjectId-like string
 */
const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
  return timestamp + randomPart;
};

/**
 * Convert array data to JoyDoc table value format
 * @param {Array} dataArray - Array of objects with data
 * @param {Array} tableColumns - JoyDoc tableColumns array with _id and mapping info
 * @param {Object} columnMapping - Maps data keys to column _ids
 * @returns {Array} JoyDoc table value array with rows and cells
 */
const convertToTableValue = (dataArray, tableColumns, columnMapping) => {
  if (!dataArray || !Array.isArray(dataArray)) return [];

  return dataArray.map((item) => {
    const cells = {};

    // Map each data field to its corresponding column
    Object.entries(columnMapping).forEach(([dataKey, columnId]) => {
      if (item[dataKey] !== undefined) {
        cells[columnId] = item[dataKey];
      }
    });

    return {
      _id: generateObjectId(),
      deleted: false,
      cells,
    };
  });
};

/**
 * Get table column definition from fieldOptions by identifier
 */
const getTableColumnsFromFieldOptions = (identifier) => {
  const tableField = fieldOptions.find(
    (f) => f.identifier === identifier && f.type === "table",
  );
  return tableField?.tableColumns || null;
};

/**
 * Inject values into template fields based on identifier
 * Supports both simple fields and table fields
 * For tables, uses column definitions from fieldOptions if not in template
 */
const injectValuesIntoTemplate = (template, values) => {
  if (!template || !values) return template;

  const clonedTemplate = JSON.parse(JSON.stringify(template));

  if (clonedTemplate.fields) {
    clonedTemplate.fields = clonedTemplate.fields.map((field) => {
      // Handle simple fields
      if (field.identifier && values[field.identifier] !== undefined) {
        const value = values[field.identifier];

        // Handle table fields - value is an array of objects
        if (field.type === "table" && Array.isArray(value)) {
          // Get tableColumns from field or from fieldOptions
          const tableColumns =
            field.tableColumns ||
            getTableColumnsFromFieldOptions(field.identifier);

          if (tableColumns) {
            // Build column mapping from tableColumns using identifier
            const columnMapping = {};
            tableColumns.forEach((col) => {
              if (col.identifier) {
                columnMapping[col.identifier] = col._id;
              }
            });

            const tableValue = convertToTableValue(
              value,
              tableColumns,
              columnMapping,
            );
            const rowOrder = tableValue.map((row) => row._id);

            return {
              ...field,
              tableColumns,
              value: tableValue,
              rowOrder,
            };
          }
        }

        return { ...field, value };
      }
      return field;
    });
  }

  return clonedTemplate;
};

const OrderDetail = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const joyDocRef = useRef(null);

  useEffect(() => {
    const staticOrder = staticOrders[orderNumber];
    if (staticOrder) {
      // Try to load template from localStorage first, then fall back to default data
      let template;
      try {
        const savedTemplates = JSON.parse(
          localStorage.getItem("savedTemplates") || "{}",
        );
        if (savedTemplates[staticOrder.templateKey]) {
          template = savedTemplates[staticOrder.templateKey];
          console.log(
            "Loading template from localStorage:",
            staticOrder.templateKey,
          );
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }

      if (!template) {
        template = data[staticOrder.templateKey];
        console.log(
          "Loading template from default data:",
          staticOrder.templateKey,
        );
      }

      const values = initialData[staticOrder.templateKey];
      const document = injectValuesIntoTemplate(template, values);
      setOrder({ ...staticOrder, document });
    } else {
      setOrder(null);
    }
    setLoading(false);
  }, [orderNumber]);

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

  const handleBack = () => {
    navigate("/orders");
  };

  const handleExportPDF = async () => {
    if (!joyDocRef.current) return;

    setExporting(true);

    try {
      const element = joyDocRef.current;

      // Use fixed width matching the JoyDoc page width (794px + some padding)
      const contentWidth = 830;
      const contentHeight = element.scrollHeight;

      const options = {
        margin: 0,
        filename: "order-" + orderNumber + ".pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          width: contentWidth,
          height: contentHeight,
          windowWidth: contentWidth,
          windowHeight: contentHeight,
        },
        jsPDF: {
          unit: "px",
          format: [contentWidth, contentHeight],
          orientation: "portrait",
          hotfixes: ["px_scaling"],
        },
      };

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <OrderDetailContainer>
        <NotFoundMessage theme={theme}>Loading...</NotFoundMessage>
      </OrderDetailContainer>
    );
  }

  if (!order) {
    return (
      <OrderDetailContainer>
        <OrderDetailHeader>
          <BackButton theme={theme} onClick={handleBack}>
            ← Back to Orders
          </BackButton>
        </OrderDetailHeader>
        <NotFoundMessage theme={theme}>
          Order not found. The order may have been deleted.
        </NotFoundMessage>
      </OrderDetailContainer>
    );
  }

  return (
    <OrderDetailContainer>
      <OrderDetailHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <BackButton theme={theme} onClick={handleBack}>
            ← Back to Orders
          </BackButton>
          <OrderInfo>
            <OrderInfoItem theme={theme}>
              <strong>Order #:</strong> {order.orderNumber}
            </OrderInfoItem>
            <OrderInfoItem theme={theme}>
              <strong>Template:</strong> {order.templateName}
            </OrderInfoItem>
            <OrderInfoItem theme={theme}>
              <strong>Date:</strong> {formatDate(order.date)}
            </OrderInfoItem>
          </OrderInfo>
        </div>

        <ExportButton onClick={handleExportPDF} disabled={exporting}>
          {exporting ? "Exporting..." : "Export PDF"}
        </ExportButton>
      </OrderDetailHeader>

      <JoyDocWrapper ref={joyDocRef}>
        <JoyDoc
          mode="readonly"
          theme={themes[theme]}
          doc={order.document}
          onChange={() => {}}
        />
      </JoyDocWrapper>
    </OrderDetailContainer>
  );
};

export default OrderDetail;
