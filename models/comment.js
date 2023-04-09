// models/Comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  email: { type: String, required: true },
  productId: { type: Number },
});

const Comment =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);

export default Comment;
