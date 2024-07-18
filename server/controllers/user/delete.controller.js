import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const deleteUser = async(req, res) => {
    const userId = req.params.id;

    try {
        const confirmExistence = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if (!confirmExistence) {
            return res.status(404).json({ok:false, message:"The user does not exist"})
        }
        const deletedUser = await prisma.user.delete({
            where:{
                id:userId
            }
        })
        if (deleteUser) {
            return res.status(200).json({ok:true, message:"The user was deleted successfully"})
        }
    } catch (error) {
        return res.status(500).json({ok:false, message: "something went wrong"})
    }
}

export default deleteUser;