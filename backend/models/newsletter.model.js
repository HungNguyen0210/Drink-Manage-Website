import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
    },
    checkbox: {
      type: Boolean,
      default: false, // Giá trị mặc định là `false`
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // Tự động thêm `createdAt` và `updatedAt`

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
