import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  if (followerId === followingId) {
    return res.status(400).json({ message: "You can't follow yourself." });
  }

  try {
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    return res.status(201).json({ ok: true, message: "Followed successfully" });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default followUser;
