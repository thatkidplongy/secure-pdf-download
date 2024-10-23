import jwt from "jsonwebtoken";
import { generateSignedLink } from "../src/services/services";

const SECRET_KEY = "your-secret-key";

describe("PDF Service Tests", () => {
  test("should generate a valid signed link", () => {
    const link = generateSignedLink(1, 101, "1h");
    const token = link.split("token=")[1];

    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded).toHaveProperty("userId", 1);
    expect(decoded).toHaveProperty("productId", 101);
  });

  // Additional tests can be added here
});
