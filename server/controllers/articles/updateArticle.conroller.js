import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatingArticle = async (req, res) => {
  const articleId = req.params.id;
  const { articleTitle, articleImageUrl, articleContent } = req.body;

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

    const updatedArticle = await prisma.article.update({
      where: {
        articleId,
      },
      data: {
        articleTitle,
        articleImageUrl,
        articleContent,
      },
    });

    if (updatedArticle) {
      return res
        .status(200)
        .json({ ok: true, message: "Article updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Something went wrong",
    });
  }
};

export default updatingArticle;
