import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createArticle = async (req, res) => {
  const user = req.user;
  const { articleTitle, articleImageUrl, articleContent } = req.body;

  if (!articleTitle || !articleContent) {
    return res.status(400).json({ ok: false, message: "provide all fields" });
  }
  try {
    if (!user) {
      return res.status(400).json({ ok: false, message: "Access denied" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    if (!existingUser) {
      return res.status(401).json({ ok: false, message: "Invalid user" });
    }

    const createdArticle = await prisma.article.create({
      data: {
        authorId: existingUser.id,
        articleTitle,
        articleImageUrl,
        articleContent,
      },
    });

    if (createdArticle) {
      return res
        .status(201)
        .json({ ok: true, message: "Article posted successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

export default createArticle;
