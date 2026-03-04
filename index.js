import express from "express";
import expressLayouts from "express-ejs-layouts";
import dbConnect from "./config/db.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
const app = express();

// CSP Headers Middleware - Allow connection to Chrome DevTools
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline'; connect-src * ws: wss:; img-src * data:; style-src * 'unsafe-inline';"
  );
  next();
});

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
    console.log("✓ Database connected");
  } catch (error) {
    console.warn("⚠ Database connection failed:", error.message);
    console.warn("App will run without database. Some features may not work.");
  }
  app.listen(8080, () => console.log("✓ Server started on http://localhost:8080"));
};
startServer();