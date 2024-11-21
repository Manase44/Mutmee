import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.config.js";

const prisma = new PrismaClient();

const userLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const confirmExistence = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });

    if (!confirmExistence) {
      return res
        .status(404)
        .json({ ok: false, message: "Incorrect credentials" });
    }

    const passwordMatch = bcrypt.compareSync(
      password,
      confirmExistence.password,
    );

    if (!passwordMatch) {
      return res
        .status(404)
        .json({ ok: false, message: "Incorrect credentials" });
    }

    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: confirmExistence.id,
      },
    });

    let imageUrl = null;

    if (userProfile) {
      imageUrl = userProfile.imageUrl;
    }
    const payload = {
      userName: confirmExistence.userName,
      userId: confirmExistence.id,
    };

    const user = {
      userName: confirmExistence.userName,
      userId: confirmExistence.id,
      imageUrl: userProfile ? userProfile.imageUrl : null,
      bio: userProfile ? userProfile.bio : null,
      role: userProfile ? userProfile.role : null,
      website: userProfile ? userProfile.website : null,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // maxAge: 600 * 1000
        maxAge: 36000 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 8 * 3600 * 1000,
      })
      .status(200)
      .json({ ok: true, message: "login successfully", user: user });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default userLogin;
