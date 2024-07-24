import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSpecificUserArticles = async (req, res) => {
  const user = req.user;
  try {
    const userArticles = await prisma.article.findMany({
      where: {
        authorId: user.userId,
      },
    });

    if (userArticles.length < 1) {
      return res.status(404).json({ ok: false, message: "No article yet" });
    }

    return res.status(200).json({ ok: true, userArticles });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "something went wrong",
    });
  }
};

export default getSpecificUserArticles;
