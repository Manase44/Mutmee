import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const user = req.user;
  const { mediaUrl, caption, posterId } = req.body;
  try {
    const poster = await prisma.user.findUnique({
      where: {
        id: user.userid,
      },
    });
    if (!poster) {
      return res.status(400).json({ ok: false, message: "invalid user" });
    }
    const createdPost = await prisma.post.create({
      data: {
        mediaUrl,
        caption,
        posterId : user.userid,
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
