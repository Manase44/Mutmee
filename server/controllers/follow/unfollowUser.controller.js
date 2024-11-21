const unfollowUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    await prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
    res.status(200).json({ ok: true, message: "Unfollowed successfully." });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default unfollowUser;
