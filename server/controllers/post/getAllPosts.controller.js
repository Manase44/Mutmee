import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await prisma.post.findMany()
        if (allPosts.length < 1) {
            return res.status(404).json({ ok: false, message: "no posts yet" })
        }

        return res.status(200).json({ ok: true, allPosts })

    } catch (error) {
        res.status(500).json({ ok: false, message: error.message })
    }
}

export default getAllPosts;
