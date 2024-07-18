import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const userLogin = async (req, res) => {
    const {userName, password} = req.body;

    try {
        const confirmExistence = await prisma.user.findUnique({
            where:{
                userName: userName
            }
        })

        if (!confirmExistence ) {
            return res.status(404).json({ok:false, message:"Incorrect credentials"})
        }

        const passwordMatch = bcrypt.compareSync(password, confirmExistence.password);

        if (!passwordMatch) {
            return res.status(404).json({ok:false, message:"Incorrect credentials"})
        }

        const userProfile = await prisma.profile.findUnique({
            where:{
                userId: confirmExistence.id
            }
        })

        let imageUrl = null

        if (userProfile) {
            imageUrl = userProfile.imageUrl
        }
        const payload = {
            userName : confirmExistence.userName,
            userId: confirmExistence.id,
            imageUrl,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1h"});
        
        res.cookie("access_token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }).status(200).json({ok:true, message:"login successfully"})

    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message })
    }
}

export default userLogin;