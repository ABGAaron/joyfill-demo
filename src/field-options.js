// Generate a unique ObjectId-like string
const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
  return timestamp + randomPart;
};

// JoyDoc's built-in default field options (recreated to get icons)
// We define these exactly as JoyDoc does internally so icons work
const joyfillDefaultFieldOptions = [
  {
    title: "Image",
    type: "image",
    displayType: "original",
  },
  {
    title: "Heading Text",
    type: "block",
    displayType: "original",
    value: "Heading",
    fontSize: 28,
    fontWeight: "bold",
  },
  {
    title: "Display Text",
    type: "block",
    displayType: "original",
    value: "Display text",
  },
  {
    title: "Text",
    type: "text",
    displayType: "original",
  },
  {
    title: "Multiline Text",
    type: "textarea",
    displayType: "original",
  },
  {
    title: "Number",
    type: "number",
    displayType: "original",
  },
  {
    title: "Date Time",
    type: "date",
    displayType: "original",
    format: "MM/DD/YYYY hh:mma",
  },
  {
    title: "Dropdown",
    type: "dropdown",
    displayType: "original",
    options: [
      { _id: generateObjectId(), value: "Yes" },
      { _id: generateObjectId(), value: "No" },
      { _id: generateObjectId(), value: "N/A" },
    ],
  },
  {
    title: "Multiple Choice",
    type: "multiSelect",
    multi: true,
    displayType: "original",
    options: [
      { _id: generateObjectId(), value: "Yes" },
      { _id: generateObjectId(), value: "No" },
      { _id: generateObjectId(), value: "N/A" },
    ],
  },
  {
    title: "Single Choice",
    type: "multiSelect",
    multi: false,
    displayType: "original",
    options: [
      { _id: generateObjectId(), value: "Yes" },
      { _id: generateObjectId(), value: "No" },
      { _id: generateObjectId(), value: "N/A" },
    ],
  },
  {
    title: "Signature",
    type: "signature",
    displayType: "original",
  },
  {
    title: "Table",
    type: "table",
    displayType: "original",
    tableColumns: [
      { _id: generateObjectId(), type: "text", title: "Text Column" },
      {
        _id: generateObjectId(),
        type: "dropdown",
        title: "Dropdown Column",
        options: [
          { _id: generateObjectId(), value: "Yes" },
          { _id: generateObjectId(), value: "No" },
          { _id: generateObjectId(), value: "N/A" },
        ],
      },
      {
        _id: generateObjectId(),
        type: "image",
        title: "Image Column",
        maxImageWidth: 190,
        maxImageHeight: 120,
      },
    ],
    value: [
      { _id: generateObjectId(), cells: {} },
      { _id: generateObjectId(), cells: {} },
      { _id: generateObjectId(), cells: {} },
    ],
  },
  {
    title: "Chart",
    type: "chart",
    displayType: "original",
    primaryDisplayOnly: true,
    yTitle: "Vertical",
    yMax: 100,
    yMin: 0,
    xTitle: "Horizontal",
    xMax: 100,
    xMin: 0,
  },
];

// Custom field options (grouped under "Packing Instructions")
const customFieldOptions = [
  {
    type: "fieldGroup",
    title: "Packing Instructions",
    open: true,
    fields: [
      {
        identifier: "scheduled_pack_date",
        title: "Scheduled Pack Date",
        type: "date",
        displayType: "original",
      },
      {
        identifier: "receival_end_date",
        title: "Receival End Date",
        type: "date",
        displayType: "original",
      },
      {
        identifier: "departure_date",
        title: "Departure Date",
        type: "date",
        displayType: "original",
      },
      {
        identifier: "customer_name",
        title: "Customer Name",
        type: "text",
        displayType: "original",
      },
      {
        identifier: "order_number",
        title: "Order Number",
        type: "text",
        displayType: "original",
      },
      {
        identifier: "packing_notes",
        title: "Packing Notes",
        type: "textarea",
        displayType: "original",
      },
    ],
  },
];

// Combine JoyDoc defaults with custom fields
export const defaultFieldOptions = [
  ...joyfillDefaultFieldOptions,
  ...customFieldOptions,
];

export const fieldOptions = [
  {
    identifier: "scheduled_pack_date",
    title: "Scheduled Pack Date",
    type: "date",
    section: "schedule",
    displayType: "original",
  },
  {
    identifier: "receival_end_date",
    title: "Receival End Date",
    type: "date",
    section: "schedule",
    displayType: "original",
  },
  {
    identifier: "departure_date",
    title: "Departure Date",
    type: "date",
    section: "schedule",
    displayType: "original",
  },
  {
    identifier: "car_expiry_date",
    title: "CAR Expiry Date",
    type: "date",
    section: "schedule",
    displayType: "original",
  },
  {
    identifier: "exporter_name",
    title: "Exporter Name",
    type: "text",
    section: "exporter",
    displayType: "original",
  },
  {
    identifier: "exporter_abn",
    title: "ABN",
    type: "text",
    section: "exporter",
    displayType: "original",
  },
  {
    identifier: "exporter_address",
    title: "Exporter Address",
    type: "textarea",
    section: "exporter",
    displayType: "original",
  },
  {
    identifier: "exporter_reference",
    title: "Exporter Reference",
    type: "text",
    section: "exporter",
    displayType: "original",
  },
  {
    identifier: "buyer_name",
    title: "Buyer Name",
    type: "text",
    section: "buyer",
    displayType: "original",
  },
  {
    identifier: "buyer_phone",
    title: "Buyer Phone",
    type: "text",
    section: "buyer",
    displayType: "original",
  },
  {
    identifier: "buyer_address",
    title: "Buyer Address",
    type: "textarea",
    section: "buyer",
    displayType: "original",
  },
  {
    identifier: "buyer_reference",
    title: "Buyer Reference",
    type: "text",
    section: "buyer",
    displayType: "original",
  },
  {
    identifier: "shipping_line",
    title: "Shipping Line",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "booking_reference",
    title: "Booking Reference",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "vessel",
    title: "Vessel",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "voyage",
    title: "Voyage",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "port_loading",
    title: "Port of Loading",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "port_discharge",
    title: "Port of Discharge",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "final_destination",
    title: "Final Destination",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "country_origin",
    title: "Country of Origin",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "country_destination",
    title: "Country of Destination",
    type: "text",
    section: "shipping",
    displayType: "original",
  },
  {
    identifier: "rfp_number",
    title: "RFP Number",
    type: "text",
    section: "reference",
    displayType: "original",
  },
  {
    identifier: "export_declaration_number",
    title: "Export Declaration Number",
    type: "text",
    section: "reference",
    displayType: "original",
  },
  {
    identifier: "authorised_by",
    title: "Authorised By",
    type: "text",
    section: "authorization",
    displayType: "original",
  },
  {
    title: "Container Details",
    identifier: "container_details",
    type: "table",
    displayType: "original",
    tableColumns: [
      {
        _id: generateObjectId(),
        type: "textarea",
        title: "MARKS & NUMBERS",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "marks_numbers",
      },
      {
        _id: generateObjectId(),
        type: "textarea",
        title: "NO./TYPE OF CONTAINERS",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "container_details",
      },
      {
        _id: generateObjectId(),
        type: "textarea",
        title: "BAGS PER CONTAINER",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "bags_per_container",
      },
      {
        _id: generateObjectId(),
        type: "textarea",
        title: "NO. DESICCANTS PER CONTAINER",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "desiccants_per_container",
      },
    ],
    value: [],
  },
  {
    title: "Product List",
    identifier: "product_list",
    type: "table",
    displayType: "original",
    tableColumns: [
      {
        _id: generateObjectId(),
        type: "text",
        title: "PRODUCT CODE",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "product_code",
      },
      {
        _id: generateObjectId(),
        type: "text",
        title: "PRODUCT NAME",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "product_name",
      },
      {
        _id: generateObjectId(),
        type: "text",
        title: "BAG TYPE",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "bag_type",
      },
      {
        _id: generateObjectId(),
        type: "text",
        title: "BAG SIZE",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "bag_size",
      },
      {
        _id: generateObjectId(),
        type: "text",
        title: "NO. OF BAGS",
        columnTitleFontWeight: "bold",
        columnTitlePadding: 8,
        identifier: "number_of_bags",
      },
    ],
    value: [],
  },
];
