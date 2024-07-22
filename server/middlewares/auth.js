import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ok:false, message:"Access denied"})
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        res.user = decode
    } catch (error) {
        return res.status(403).json({ok:false, message:"Invalid token"})
    }
    next();
}

export default verifyToken;