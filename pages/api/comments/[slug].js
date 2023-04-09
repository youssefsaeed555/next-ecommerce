import connectMongo from "@/utils/connectMongo";
import Comment from "../../../models/comment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await Comment.find({ productId: req.query.slug });
    res.status(200).json({ message: "get comment successfully", data });
  }
}
