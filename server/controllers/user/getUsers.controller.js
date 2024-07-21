import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllusers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    if (allUsers.length < 1) {
      return res.status(404).json({ ok: false, message: "No user exists" });
    } else {
      return res.status(200).json({ ok: true, allUsers });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getAllusers;
