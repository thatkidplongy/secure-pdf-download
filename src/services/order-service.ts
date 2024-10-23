// orderService.ts
import { Order } from "../models/models"; // Import your Order interface
import { generateToken } from "./services"; // Import your token generation function

let orders: Order[] = [];
let orderIdCounter = 1; // Counter for order IDs

export const purchaseReport = (userId: number, productId: number): string => {
  const newOrder: Order = {
    id: orderIdCounter++,
    productId,
    purchaserId: userId,
  };

  orders.push(newOrder);

  // Generate token
  return generateToken(userId, productId);
};

export const hasPurchasedProduct = (
  userId: number,
  productId: number
): boolean => {
  return orders.some(
    (order) => order.purchaserId === userId && order.productId === productId
  );
};
