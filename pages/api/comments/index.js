import connectMongo from "@/utils/connectMongo";
import Comment from "../../../models/comment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectMongo();
    const comment = await Comment.create(req.body);
    res.status(200).json({ message: "create comment successfully", comment });
  }
}
