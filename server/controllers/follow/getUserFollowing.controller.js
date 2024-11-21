import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getFollowing = async (req, res) => {
  const { userId } = req.params.id;

  try {
    const confirmUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!confirmUser) {
      return res.status(400).json({ ok: false, message: "Invalid user" });
    }

    const userFollowing = await prisma.follow.findMany({
      where: { followingId: userId },
    });

    if (userFollowing.length < 1) {
      return res.status(404).json({ ok: true, message: "No followings yet" });
    }

    return res.status(200).json({ ok: true, userFollowing });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default getFollowing;
