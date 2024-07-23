import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSpecificUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const specificUserById = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const specificUserByUsername = await prisma.user.findUnique({
      where: {
        userName: userId,
      },
    });

    if (specificUserById) {
      return res.status(200).json({
        ok: true,
        specificUserById,
      });
    }
    if (specificUserByUsername) {
      return res.status(200).json({
        ok: true,
        specificUserByUsername,
      });
    }
    if (!specificUserByUsername || !specificUserByUsername) {
      return res
        .status(404)
        .json({ ok: false, message: "The user does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getSpecificUser;
