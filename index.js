import express from "express";
import expressLayouts from "express-ejs-layouts";
import dbConnect from "./config/db.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";

const app = express();

app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", productRoutes);
app.use("/users", userRoutes);

const startServer = async () => {
  try {
    await dbConnect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database not available - app running without DB");
  }
  app.listen(8080, () => console.log("Server running on http://localhost:8080"));
};

startServer();