import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "10h"
    })
};

export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_SECRET_KEY, { 
        expiresIn: '8h' 
    })
};