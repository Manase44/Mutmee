import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    if (allPosts.length < 1) {
      return res.status(404).json({ ok: false, message: "no posts yet" });
    }

    const posts = await Promise.all
    (allPosts.map(async(post) => {
      const poster = await prisma.user.findUnique({
        where:{
          id: post.posterId,
        }
      })
      const profile = await prisma.profile.findUnique({
        where:{
          userId: poster.id,
        }
      })
      const posterUserName = poster.userName;
      const posterImageUrl = profile ? profile.imageUrl : null

      return  {
        mediaUrl:post.mediaUrl,
        caption: post.caption,
        likes: post.likes,
        posterImageUrl,
        posterUserName,
      };
    })
  )



    return res.status(200).json({ ok: true, allPosts:posts });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default getAllPosts;
