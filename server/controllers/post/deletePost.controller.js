import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const user = req.user;
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
    const userPosts = await prisma.post.findMany({
      where: {
        posterId: user.userid,
      },
    });
    if (deletedPost) {
      return res
        .status(200)
        .json({ ok: true, message: "post deleted successfully", userPosts });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default deletePost;
