import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/ejsnode");
};

export default dbConnect;
