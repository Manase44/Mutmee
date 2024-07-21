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
      return res.status(400).json({ ok: false, message: "invalid user" });
    }
    const userPosts = await prisma.post.findMany({
      where: {
        posterId: userId,
      },
    });
    if (userPosts.length < 1) {
      return res.status(404).json({ ok: false, message: "no post yet" });
    }
    if (userPosts.length > 0) {
      return res.status(200).json({ ok: true, userPosts });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getPostOfSpecificUser;
