import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hasPurchasedProduct, Order } from "../models/models";

const SECRET_KEY = "your-secret-key";
const EXPIRATION_TIME = "1h"; // Token expiration time

// Generate signed link for PDF download
export const generateSignedLink = (
  userId: number,
  productId: number,
  expiresIn: string
) => {
  const token = jwt.sign({ userId, productId }, SECRET_KEY, { expiresIn });
  return `http://localhost:3000/api/download-pdf?token=${token}`;
};

export const generateToken = (userId: number, productId: number): string => {
  const token = jwt.sign({ userId, productId }, SECRET_KEY, {
    expiresIn: EXPIRATION_TIME,
  });

  return token;
};

// Middleware to verify token and check user access
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.query.token as string;
  console.log("token: ", token);

  if (!token) {
    return res.status(400).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      userId: number;
      productId: number;
    };
    const { userId, productId } = decoded;
    console.log("userId: ", userId);

    // Check if user has purchased the product
    if (!hasPurchasedProduct(userId, productId)) {
      console.log(
        `Unauthorized: User ${userId} has not purchased product ${productId}`
      );
      return res
        .status(403)
        .json({ message: "Unauthorized. You have not purchased this report." });
    }

    // All good, continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Mocking an in-memory storage for orders
let orders: Order[] = [];
let orderIdCounter = 1; // Simple counter for order IDs

export const purchaseReport = (userId: number, productId: number): string => {
  // Create a new order
  const newOrder: Order = {
    id: orderIdCounter++, // Auto-incrementing order ID
    productId,
    purchaserId: userId,
  };

  // Simulate saving the order (you'd typically save this to a database)
  orders.push(newOrder);

  // Generate a token after successful order creation
  const token = generateToken(userId, productId);

  // Return the generated token
  return token;
};
