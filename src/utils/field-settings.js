/*
identifier: {
  label: 'Identifier',  // Custom label
  options: [
    {
      title: 'Plain Identifier Option',
      description: 'Identifier details for text',
      value: 'customer_text_customidentifierselector'
    }
  ]
}
*/

// Identifier options based on Packing Instructions data structure
const packingInstructionIdentifiers = [
  // Schedule Section
  {
    title: "Scheduled Pack Date",
    description: "Date when packing is scheduled",
    value: "scheduled_pack_date",
  },
  {
    title: "Receival End Date",
    description: "End date for receival",
    value: "receival_end_date",
  },
  {
    title: "Departure Date",
    description: "Shipping departure date",
    value: "departure_date",
  },
  {
    title: "CAR Expiry Date",
    description: "CAR expiry date",
    value: "car_expiry_date",
  },

  // Exporter Section
  {
    title: "Exporter Name",
    description: "Name of the exporting company",
    value: "exporter_name",
  },
  {
    title: "Exporter ABN",
    description: "Australian Business Number",
    value: "exporter_abn",
  },
  {
    title: "Exporter Address",
    description: "Address of the exporter",
    value: "exporter_address",
  },
  {
    title: "Exporter Reference",
    description: "Exporter's reference number",
    value: "exporter_reference",
  },

  // Buyer Section
  {
    title: "Buyer Name",
    description: "Name of the buyer",
    value: "buyer_name",
  },
  {
    title: "Buyer Phone",
    description: "Buyer's contact phone",
    value: "buyer_phone",
  },
  {
    title: "Buyer Address",
    description: "Address of the buyer",
    value: "buyer_address",
  },
  {
    title: "Buyer Reference",
    description: "Buyer's reference number",
    value: "buyer_reference",
  },

  // Shipping Section
  {
    title: "Shipping Line",
    description: "Name of shipping company",
    value: "shipping_line",
  },
  {
    title: "Booking Reference",
    description: "Shipping booking reference",
    value: "booking_reference",
  },
  {
    title: "Vessel",
    description: "Name of the vessel",
    value: "vessel",
  },
  {
    title: "Voyage",
    description: "Voyage number",
    value: "voyage",
  },
  {
    title: "Port of Loading",
    description: "Port where goods are loaded",
    value: "port_loading",
  },
  {
    title: "Port of Discharge",
    description: "Port where goods are unloaded",
    value: "port_discharge",
  },
  {
    title: "Final Destination",
    description: "Final delivery destination",
    value: "final_destination",
  },
  {
    title: "Country of Origin",
    description: "Origin country of goods",
    value: "country_origin",
  },
  {
    title: "Country of Destination",
    description: "Destination country",
    value: "country_destination",
  },

  // Reference Section
  {
    title: "RFP Number",
    description: "Request for Proposal number",
    value: "rfp_number",
  },
  {
    title: "Export Declaration Number",
    description: "Export declaration reference",
    value: "export_declaration_number",
  },

  // Authorization Section
  {
    title: "Authorised By",
    description: "Person who authorised the shipment",
    value: "authorised_by",
  },

  // Tables
  {
    title: "Container Details",
    description: "Table of container information",
    value: "container_details",
  },
  {
    title: "Product List",
    description: "Table of products being shipped",
    value: "product_list",
  },
];

export const identifierFieldSettings = {
  label: "Data Source",
  options: packingInstructionIdentifiers,
};
