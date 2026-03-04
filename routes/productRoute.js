import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productModel.find();
  res.render("products", { products });
});

router.get("/add", (req, res) => {
  res.render("addproduct");
});

router.post("/save", async (req, res) => {
  const body = req.body;
  await productModel.create(body);
  res.redirect("/");
});

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findOne({ _id: id });
  res.render("editproduct", { product });
});

router.post("/:id/save-product", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  await productModel.findByIdAndUpdate(id, body);
  res.redirect("/");
});

router.get("/:id/delete", async (req, res) => {
  const id = req.params.id;
  await productModel.findByIdAndDelete(id);
  res.redirect("/");
});

export default router;
