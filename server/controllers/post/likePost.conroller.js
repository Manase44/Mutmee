import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const likePost = async (req, res) => {
  const user = req.user;
  const postId = req.params.id;
  try {
    if (!user) {
      return res.status(401).json({ ok: false, message: "Access denied" });
    }

    const userLiked = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (!userLiked) {
      return res.status(400).json({ ok: false, message: "invalid user" });
    }

    const likedPost = await prisma.post.findUnique({
      where: {
        postId,
      },
    });
    if (!likedPost) {
      return res
        .status(404)
        .json({ ok: false, message: "The post does no exist" });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        postLiked_userLiked:{
          postLiked:likedPost.postId,
          userLiked:user.userId
        }
      },
    });

   
    if (existingLike) {
      return res.status(400).json({ ok: false, message: "Already liked" });
    }

    const likePost = await prisma.like.create({
      data: {
        postLiked: likedPost.postId,
        userLiked: user.userId,
      },
    });

    const postLikes = await prisma.like.findMany({
      where: {
        postLiked: likePost,
      },
    });
    
    if (likePost) {
      return res
        .status(201)
        .json({ ok: true, message: "Post liked", likes: postLikes.length });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

export default likePost;
