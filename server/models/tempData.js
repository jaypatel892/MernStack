const mongoose = require("mongoose");

// Import models
const Address = require("./Address");
const Cart = require("./Cart");
const Feature = require("./Feature");
const Order = require("./Order");
const Product = require("./Product");
const ProductReview = require("./Review");
const User = require("./User");

// MongoDB Connection
mongoose
    .connect("mongodb+srv://newproject:980980@cluster0.bduy0.mongodb.net/wt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Common Image for all documents
const commonImage =
  "https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg";

async function seedDatabase() {
  try {
    // **Clear Existing Data**
    await Promise.all([
      User.deleteMany({}),
      Address.deleteMany({}),
      Product.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
      Feature.deleteMany({}),
      ProductReview.deleteMany({}),
    ]);
    console.log("Old data cleared.");

    // **Insert Users**
    const users = await User.insertMany([
      { userName: "user1", email: "user1@example.com", password: "pass1" },
      { userName: "user2", email: "user2@example.com", password: "pass2" },
      { userName: "user3", email: "user3@example.com", password: "pass3" },
      { userName: "user4", email: "user4@example.com", password: "pass4" },
      { userName: "user5", email: "user5@example.com", password: "pass5" },
    ]);
    console.log("Users inserted.");

    // **Insert Addresses**
    const addresses = await Address.insertMany(
      users.map((user, index) => ({
        userId: user._id,
        address: `${100 + index} Main St`,
        city: "City " + (index + 1),
        pincode: "1000" + index,
        phone: "12345678" + index,
        notes: "Address " + (index + 1),
      }))
    );
    console.log("Addresses inserted.");

    // **Insert Products**
    const products = await Product.insertMany([
      { image: commonImage, title: "Product 1", description: "Best Product", category: "A", brand: "Brand X", price: 100, salePrice: 90, totalStock: 50, averageReview: 4.5 },
      { image: commonImage, title: "Product 2", description: "Good Quality", category: "B", brand: "Brand Y", price: 200, salePrice: 180, totalStock: 30, averageReview: 4.0 },
      { image: commonImage, title: "Product 3", description: "Affordable", category: "A", brand: "Brand X", price: 150, salePrice: 135, totalStock: 20, averageReview: 3.8 },
      { image: commonImage, title: "Product 4", description: "Premium Choice", category: "C", brand: "Brand Z", price: 250, salePrice: 225, totalStock: 10, averageReview: 4.2 },
      { image: commonImage, title: "Product 5", description: "Budget Friendly", category: "B", brand: "Brand Y", price: 120, salePrice: 110, totalStock: 40, averageReview: 4.7 },
    ]);
    console.log("Products inserted.");

    // **Insert Carts**
    const carts = await Cart.insertMany([
      { userId: users[0]._id, items: [{ productId: products[0]._id, quantity: 2 }, { productId: products[1]._id, quantity: 1 }] },
      { userId: users[1]._id, items: [{ productId: products[2]._id, quantity: 3 }, { productId: products[3]._id, quantity: 1 }] },
    ]);
    console.log("Carts inserted.");

    // **Insert Orders**
    const orders = await Order.insertMany([
      {
        userId: users[0]._id,
        cartId: carts[0]._id,
        cartItems: [
          { productId: products[0]._id, title: "Product 1", image: commonImage, price: 100, quantity: 2 },
          { productId: products[1]._id, title: "Product 2", image: commonImage, price: 200, quantity: 1 },
        ],
        addressInfo: addresses[0],
        orderStatus: "Processing",
        paymentMethod: "Credit Card",
        paymentStatus: "Paid",
        totalAmount: 400,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymentId: "pay_123456",
        payerId: "payer_123456",
      },
    ]);
    console.log("Orders inserted.");

    // **Insert Features**
    await Feature.insertMany([
      { image: commonImage },
      { image: commonImage },
      { image: commonImage },
    ]);
    console.log("Features inserted.");

    // **Insert Reviews**
    const reviews = await ProductReview.insertMany([
      { productId: products[0]._id, userId: users[0]._id, userName: users[0].userName, reviewMessage: "Amazing!", reviewValue: 5 },
      { productId: products[1]._id, userId: users[1]._id, userName: users[1].userName, reviewMessage: "Good product!", reviewValue: 4 },
      { productId: products[2]._id, userId: users[2]._id, userName: users[2].userName, reviewMessage: "It's okay.", reviewValue: 3 },
      { productId: products[3]._id, userId: users[3]._id, userName: users[3].userName, reviewMessage: "Loved it!", reviewValue: 5 },
      { productId: products[4]._id, userId: users[4]._id, userName: users[4].userName, reviewMessage: "Worth it!", reviewValue: 4 },
    ]);
    console.log("Reviews inserted.");

    console.log("✅ All demo data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting demo data:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run seeding function
seedDatabase();


// const mongoose = require("mongoose");

// // Import models
// const Address = require("./Address");
// const Cart = require("./Cart");
// const Feature = require("./Feature");
// const Order = require("./Order");
// const Product = require("./Product");
// const ProductReview = require("./Review");
// const User = require("./User");

// // MongoDB Connection
// mongoose
//   .connect("mongodb+srv://newproject:980980@cluster0.bduy0.mongodb.net/wt", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Common Image URL
// const commonImage =
//   "https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg";

// // Categories & Brands
// const categories = ["Men", "Women", "Kids", "Accessories", "Footwear"];
// const brands = ["Nike", "Adidas", "Puma", "Levi's", "Zara", "H&M"];

// async function seedDatabase() {
//   try {
//     // **Clear Existing Data**
//     await Promise.all([
//       User.deleteMany({}),
//       Address.deleteMany({}),
//       Product.deleteMany({}),
//       Cart.deleteMany({}),
//       Order.deleteMany({}),
//       Feature.deleteMany({}),
//       ProductReview.deleteMany({}),
//     ]);
//     console.log("🗑️ Old data cleared.");

//     // **Insert Users**
//     const users = await User.insertMany([
//       { userName: "john_doe", email: "john@example.com", password: "pass1" },
//       { userName: "jane_doe", email: "jane@example.com", password: "pass2" },
//       { userName: "alice_smith", email: "alice@example.com", password: "pass3" },
//       { userName: "bob_jones", email: "bob@example.com", password: "pass4" },
//       { userName: "charlie_brown", email: "charlie@example.com", password: "pass5" },
//     ]);
//     console.log("👤 Users inserted.");

//     // **Insert Addresses**
//     const addresses = await Address.insertMany(
//       users.map((user, index) => ({
//         userId: user._id,
//         address: `${100 + index} Main St`,
//         city: "City " + (index + 1),
//         pincode: "1000" + index,
//         phone: "12345678" + index,
//         notes: "Address " + (index + 1),
//       }))
//     );
//     console.log("📍 Addresses inserted.");

//     // **Insert Products**
//     const products = await Product.insertMany([
//       { image: commonImage, title: "Nike Running Shoes", description: "Comfortable running shoes", category: "Footwear", brand: "Nike", price: 120, salePrice: 110, totalStock: 50, averageReview: 4.5 },
//       { image: commonImage, title: "Adidas Sweatshirt", description: "Warm and stylish sweatshirt", category: "Men", brand: "Adidas", price: 80, salePrice: 75, totalStock: 40, averageReview: 4.2 },
//       { image: commonImage, title: "Puma Kids Sneakers", description: "Durable sneakers for kids", category: "Kids", brand: "Puma", price: 90, salePrice: 85, totalStock: 30, averageReview: 4.3 },
//       { image: commonImage, title: "Levi's Denim Jacket", description: "Classic denim jacket", category: "Men", brand: "Levi's", price: 150, salePrice: 140, totalStock: 25, averageReview: 4.6 },
//       { image: commonImage, title: "Zara Women's Handbag", description: "Trendy and spacious handbag", category: "Accessories", brand: "Zara", price: 95, salePrice: 90, totalStock: 35, averageReview: 4.7 },
//       { image: commonImage, title: "H&M Casual Dress", description: "Light and comfortable dress", category: "Women", brand: "H&M", price: 110, salePrice: 100, totalStock: 20, averageReview: 4.4 },
//     ]);
//     console.log("🛍️ Products inserted.");

//     // **Insert Carts**
//     const carts = await Cart.insertMany([
//       { userId: users[0]._id, items: [{ productId: products[0]._id, quantity: 2 }, { productId: products[1]._id, quantity: 1 }] },
//       { userId: users[1]._id, items: [{ productId: products[2]._id, quantity: 3 }, { productId: products[3]._id, quantity: 1 }] },
//     ]);
//     console.log("🛒 Carts inserted.");

//     // **Insert Orders**
//     const orders = await Order.insertMany([
//       {
//         userId: users[0]._id,
//         cartId: carts[0]._id,
//         cartItems: [
//           { productId: products[0]._id, title: "Nike Running Shoes", image: commonImage, price: 120, quantity: 2 },
//           { productId: products[1]._id, title: "Adidas Sweatshirt", image: commonImage, price: 80, quantity: 1 },
//         ],
//         addressInfo: addresses[0],
//         orderStatus: "Processing",
//         paymentMethod: "Credit Card",
//         paymentStatus: "Paid",
//         totalAmount: 320,
//         orderDate: new Date(),
//         orderUpdateDate: new Date(),
//         paymentId: "pay_123456",
//         payerId: "payer_123456",
//       },
//     ]);
//     console.log("📦 Orders inserted.");

//     // **Insert Features**
//     await Feature.insertMany([
//       { image: commonImage },
//       { image: commonImage },
//       { image: commonImage },
//     ]);
//     console.log("⭐ Features inserted.");

//     // **Insert Reviews**
//     await ProductReview.insertMany([
//       { productId: products[0]._id, userId: users[0]._id, userName: users[0].userName, reviewMessage: "Awesome shoes!", reviewValue: 5 },
//       { productId: products[1]._id, userId: users[1]._id, userName: users[1].userName, reviewMessage: "Good quality sweatshirt.", reviewValue: 4 },
//       { productId: products[2]._id, userId: users[2]._id, userName: users[2].userName, reviewMessage: "Perfect for my kid!", reviewValue: 5 },
//       { productId: products[3]._id, userId: users[3]._id, userName: users[3].userName, reviewMessage: "Nice jacket, love the fit.", reviewValue: 4 },
//       { productId: products[4]._id, userId: users[4]._id, userName: users[4].userName, reviewMessage: "Stylish handbag, worth it.", reviewValue: 5 },
//     ]);
//     console.log("📝 Reviews inserted.");

//     console.log("🎉 All demo data inserted successfully!");
//   } catch (error) {
//     console.error("❌ Error inserting demo data:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// // Run seeding function
// seedDatabase();
