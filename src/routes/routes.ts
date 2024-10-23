import { NextFunction, Request, Response, Router } from "express";
import { purchaseReport, verifyToken } from "../services/services";

const router = Router();

// Route for downloading the PDF with correct typings
router.get(
  "/download-pdf",
  (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next); // Ensure the middleware is correctly called
  },
  (req: Request, res: Response) => {
    // This runs only if verifyToken middleware succeeds
    res.status(200).send("PDF download starts...");
  }
);

// Define an interface for the request body
interface PurchaseRequestBody {
  userId: number;
  productId: number;
}

// POST /purchase-report endpoint
router.post(
  "/purchase-report",
  (req: Request, res: Response, next: NextFunction) => {
    const { userId, productId } = req.body;

    // Validate input
    if (userId === undefined || productId === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required." });
    }

    try {
      const token = purchaseReport(userId, productId);
      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Error processing purchase." });
    }

    next();
  }
);

export default router;
