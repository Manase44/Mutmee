import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getSpecificUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const specificUser = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if (specificUser) {
             return res.status(200).json({ok:true, specificUser})
        } else {
            return res.status(404).json({ok:false, message:"The user does not exist"})
        }
    } catch (error) {
        return res.status(500).json({ ok: false, message: "something went wrong" })
    }
}

export default getSpecificUser;