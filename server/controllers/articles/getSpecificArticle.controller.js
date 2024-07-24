import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSingleArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await prisma.article.findUnique({
      where: {
        articleId,
      },
    });

    if (!article) {
      return res
        .status(404)
        .json({ ok: false, message: "The article does not exist" });
    }

    return res.status(200).json({ ok: true, article });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "something went wrong",
    });
  }
};

export default getSingleArticle;
