import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getALlArticles = async (req, res) => {
  try {
    const availableArticles = await prisma.article.findMany();

    if (availableArticles.length < 1) {
      return res.status(404).json({ ok: false, message: "No article yet" });
    }

    return res.status(200).json({ ok: true, availableArticles });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "something went wrong",
    });
  }
};

export default getALlArticles;
