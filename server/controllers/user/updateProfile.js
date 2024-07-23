import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatingUserProfile = async (req, res) => {
  const user = req.user;
  const { imageUrl, bio, website, role, phoneNumber } = req.body;
  try {
    if (!user) {
      return res.status(401).json({ ok: false, message: "Access denied" });
    }
    const newProfile = await prisma.profile.upsert({
      where: {
        userId: user.userId,
      },
      create: {
        userId: user.userId,
        imageUrl,
        bio,
        website,
        role,
        phoneNumber,
      },
      update: {
        userId: user.id,
        imageUrl,
        bio,
        website,
        role,
        phoneNumber,
      },
    });

    const userProfile = {
      imageUrl: newProfile.imageUrl,
      bio: newProfile.bio,
      website: newProfile.website,
      role: newProfile.role,
      phoneNumber: newProfile.phoneNumber,
    };

    if (newProfile) {
      return res
        .status(200)
        .json({
          ok: true,
          userProfile,
          message: "Profile updated successfully",
        });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default updatingUserProfile;
