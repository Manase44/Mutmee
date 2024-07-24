import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addComment = async (req, res) => {
  const user = req.user;
  const { comment, postId } = req.body;
  try {
    if (!user) {
      return res.status(401).json({ ok: false, message: "Access denied" })
    }
    const commentor = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (!commentor) {
      return res.status(401).json({ ok: false, message: "Access denied" });
    }
    const commentedPost = await prisma.post.findUnique({
      where: {
        postId,
      },
    });
    if (!commentedPost) {
      return res
        .status(404)
        .json({ ok: false, message: "The post does no exist" });
    }
    const newComment = await prisma.comment.create({
      data: {
        postId: commentedPost.postId,
        commentedBy: commentor.id,
        text: comment,
      },
    });

    const postComments = await prisma.comment.findMany({
      where: {
        postId: commentedPost.postId,
      },
    });

    if (newComment) {
      return res
        .status(201)
        .json({ ok: true, message: "Comment posted", comments: postComments });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default addComment;
