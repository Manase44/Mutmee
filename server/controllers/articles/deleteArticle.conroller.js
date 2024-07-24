import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deletingArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const existingArticle = await prisma.article.findUnique({
      where: {
        articleId,
      },
    });
    if (!existingArticle) {
      return res
        .status(404)
        .json({ ok: false, message: "The article does not exist" });
    }

    const deletedArticle = await prisma.article.delete({
      where: {
        articleId,
      },
    });

    const updatedAticleList = await prisma.article.findMany();

    if (deletedArticle) {
      return res
        .status(200)
        .json({
          ok: true,
          message: "Article deleted successfully",
          articles: updatedAticleList,
        });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "something went wrong",
    });
  }
};

export default deletingArticle;
