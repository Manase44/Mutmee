import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPostOfSpecificUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const confirmUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!confirmUser) {
      return res.status(400).json({ ok: false, message: "Invalid user" });
    }
    const userPosts = await prisma.post.findMany({
      where: {
        posterId: userId,
      },
    });
    if (userPosts.length < 1) {
      return res.status(404).json({ ok: false, message: "No post yet" });
    }

    const posts = await Promise.all(
      userPosts.map(async (post) => {
        const comments = await prisma.comment.findMany({
          where: {
            postId: post.postId,
          },
        });

        const postLikes = await prisma.like.findMany({
          where:{
            postLiked:post.postId,
          }
        })

        return {
          postId: post.postId,
          mediaUrl: post.mediaUrl,
          caption: post.caption,
          likes: postLikes.length,
          comments,
        };
      }),
    );

    if (userPosts.length > 0) {
      return res.status(200).json({ ok: true, userPosts: posts });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default getPostOfSpecificUser;
