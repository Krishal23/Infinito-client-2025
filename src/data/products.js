import f1 from "../pages/Merchandise/merchimg/f1.png";
import f2 from "../pages/Merchandise/merchimg/f2.png";
import f3 from "../pages/Merchandise/merchimg/f3.png";
import f4 from "../pages/Merchandise/merchimg/f4.png";
import f5 from "../pages/Merchandise/merchimg/f5.png";
import b1 from "../pages/Merchandise/merchimg/b1.png";
import b2 from "../pages/Merchandise/merchimg/b2.png";
import b3 from "../pages/Merchandise/merchimg/b3.png";
import b4 from "../pages/Merchandise/merchimg/b4.png";
import b5 from "../pages/Merchandise/merchimg/b5.png";

export const products = [
  {
    id: 1,
    name: "T-shirt-Vimal Edition",
    price: "₹5.00",
    image: f1,
    inStock: true,
    description: "Soft Fibric but Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 2,
    name: "T-shirt-GhostRider Edition",
    price: "₹150.00",
    image: f2,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 3,
    name: "T-shirt-Black Hourse Edition",
    price: "₹6000",
    image: f3,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 4,
    name: "Tshirt - GOLD EDITION",
    price: "₹300.00",
    image: f4,
    inStock: false,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 5,
    name: "Hoddie- Allen Walker Edition",
    price: "₹100000.00",
    image: f5,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 6,
    name: "Tshirt- Personal Favourite",
    price: "₹150.00",
    image: b1,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 7,
    name: "T-shirt- Personal Favourite again",
    price: "₹500.00",
    image: b2,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 8,
    name: "Tshirt",
    price: "₹450.00",
    image: b3,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 9,
    name: "Statue of Unity wali aunty",
    price: "₹250.00",
    image: b4,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by Kholi"
  },
  {
    id: 10,
    name: "Hoddie- Black Edition",
    price: "₹350.00",
    image: b5,
    inStock: true,
    description: "Isme tera Ghar chala jaaega.",
    sku: "Signed by "
  }
];

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};
