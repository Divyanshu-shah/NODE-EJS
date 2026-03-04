import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.render("users", { users });
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/saveuser", async (req, res) => {
  const body = req.body;
  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;
  await userModel.create(body);
  res.redirect("/users");
});

router.post("/checkuser", async (req, res) => {
  const { email, password } = req.body;
  const found = await userModel.findOne({ email });
  if (found) {
    const chkPassword = await bcrypt.compare(password, found.password);
    if (chkPassword) {
      res.redirect("/users");
    }
  }
});

router.get("/add", (req, res) => {
  res.render("adduser");
});

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.render("edituser", { user });
});

router.post("/:id/save-user", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }
  await userModel.findByIdAndUpdate(id, body);
  res.redirect("/users");
});

router.get("/:id/delete", async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.redirect("/users");
});

export default router;
