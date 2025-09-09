import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      required: true,
      unique: true,
      match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const USER = mongoose.models.USER || mongoose.model("USER", userSchema);
export default USER;
