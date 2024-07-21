import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { emailAddress, userName, password } = req.body;

  if (!emailAddress || !userName || !password) {
    return res
      .status(400)
      .json({ ok: false, message: "provide all details to register" });
  }
  try {
    const existingUserEmail = await prisma.user.findUnique({
      where: {
        emailAddress,
      },
    });
    const existingUserName = await prisma.user.findUnique({
      where: {
        userName,
      },
    });
    if (existingUserEmail || existingUserName) {
      return res
        .status(400)
        .json({ ok: false, message: "A user already exists" });
    }
    const harshedPassword = bcrypt.hashSync(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        emailAddress,
        userName,
        password: harshedPassword,
      },
    });
    if (createdUser) {
      return res
        .status(201)
        .json({ ok: true, message: "Registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default registerUser;
