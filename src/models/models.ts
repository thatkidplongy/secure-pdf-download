type User = { id: number; firstName: string; lastName: string; email: string };
type Product = {
  id: number;
  title: string;
  resalePrice: number;
  inspectorId: number;
};
export type Order = { id: number; productId: number; purchaserId: number };

const users: User[] = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
];

const products: Product[] = [
  {
    id: 101,
    title: "House Inspection Report",
    resalePrice: 200,
    inspectorId: 3,
  },
];

// Mock orders
const orders: Order[] = [
  { id: 1001, productId: 101, purchaserId: 1 },
  { id: 1002, productId: 102, purchaserId: 2 },
];

// Mock check for product purchase
export const hasPurchasedProduct = (
  userId: number,
  productId: number
): boolean => {
  const order = orders.some(
    (o) => o.id === userId && o.productId === productId
  );
  return order;
};
