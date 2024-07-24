import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const user = req.user;

  const { mediaUrl, mediaType, caption } = req.body;
  try {
    if (!user) {
      return res.status(401).json({ ok: false, message: "Access denied" })
    }
    const poster = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (!poster) {
      return res.status(400).json({ ok: false, message: "invalid user" });
    }
    const createdPost = await prisma.post.create({
      data: {
        mediaUrl,
        mediaType,
        caption,
        posterId: user.userId,
      },
    });
    if (createdPost) {
      return res
        .status(201)
        .json({ ok: true, message: "post created successfully" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default createPost;
