import { data } from "../data";
import { initialData } from "../initial-data";

const ORDERS_KEY = "joyfill_orders";

/**
 * Inject values from initialData into a template's fields based on identifier
 * @param {Object} template - The JoyDoc template object
 * @param {Object} values - Object with field identifier keys and values
 * @returns {Object} Template with injected values
 */
export const injectValuesIntoTemplate = (template, values) => {
  if (!template || !values) return template;

  // Deep clone the template to avoid mutating the original
  const clonedTemplate = JSON.parse(JSON.stringify(template));

  // Update field values based on identifier
  if (clonedTemplate.files && clonedTemplate.files[0]?.fields) {
    clonedTemplate.files[0].fields = clonedTemplate.files[0].fields.map(
      (field) => {
        if (field.identifier && values[field.identifier] !== undefined) {
          return { ...field, value: values[field.identifier] };
        }
        return field;
      },
    );
  }

  // Also check root-level fields array
  if (clonedTemplate.fields) {
    clonedTemplate.fields = clonedTemplate.fields.map((field) => {
      if (field.identifier && values[field.identifier] !== undefined) {
        return { ...field, value: values[field.identifier] };
      }
      return field;
    });
  }

  return clonedTemplate;
};

/**
 * Static order for Packing Instructions demo
 */
const STATIC_PACKING_ORDER = {
  orderNumber: "PKG-001",
  date: "2023-11-27T10:00:00.000Z",
  templateName: "Packing Instructions",
  templateKey: "packingInstructions",
  isStatic: true,
};

/**
 * Get all orders from localStorage (including static orders)
 * @returns {Array} Array of order objects
 */
export const getOrders = () => {
  try {
    const orders = localStorage.getItem(ORDERS_KEY);
    const savedOrders = orders ? JSON.parse(orders) : [];
    // Add static order at the beginning
    return [STATIC_PACKING_ORDER, ...savedOrders];
  } catch (error) {
    console.error("Error reading orders from localStorage:", error);
    return [STATIC_PACKING_ORDER];
  }
};

/**
 * Save an order to localStorage
 * @param {Object} order - Order object containing orderNumber, date, templateName, document
 * @returns {boolean} Success status
 */
export const saveOrder = (order) => {
  try {
    // Get only saved orders (not static ones)
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error("Error saving order to localStorage:", error);
    return false;
  }
};

/**
 * Get a specific order by order number
 * @param {string|number} orderNumber - The order number to find
 * @returns {Object|null} The order object or null if not found
 */
export const getOrderByNumber = (orderNumber) => {
  try {
    const orders = getOrders();
    const order = orders.find(
      (order) => String(order.orderNumber) === String(orderNumber),
    );

    if (!order) return null;

    // For static orders, build the document from template + initial data
    if (order.isStatic && order.templateKey) {
      const template = data[order.templateKey];
      const values = initialData[order.templateKey];
      if (template && values) {
        const document = injectValuesIntoTemplate(template, values);
        return { ...order, document };
      }
    }

    return order;
  } catch (error) {
    console.error("Error getting order from localStorage:", error);
    return null;
  }
};

/**
 * Delete an order by order number
 * @param {string|number} orderNumber - The order number to delete
 * @returns {boolean} Success status
 */
export const deleteOrder = (orderNumber) => {
  try {
    // Get only saved orders (not static ones)
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    const filteredOrders = orders.filter(
      (order) => String(order.orderNumber) !== String(orderNumber),
    );
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));
    return true;
  } catch (error) {
    console.error("Error deleting order from localStorage:", error);
    return false;
  }
};
