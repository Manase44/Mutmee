import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        postId,
      },
    });
    if (!post) {
      return res
        .status(404)
        .json({ ok: false, message: "post does not exist" });
    }
    const deletedPost = await prisma.post.delete({
      where: {
        postId,
      },
    });
    if (deletedPost) {
      return res
        .status(200)
        .json({ ok: true, message: "post deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default deletePost;
