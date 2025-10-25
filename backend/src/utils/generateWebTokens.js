import jwt from 'jsonwebtoken'

export const generateWebToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.My_JWT_secret, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000
    });
    return token
}

export const verifyToken = (req, res, next) => {
    const { body } = req;
    const { token } = req.cookies;
    const currentTime = Date.now() / 1000;
    if (!token) return res.status(401).json({success:false,msg:"Session token not there"});
    try {
        const verified = jwt.verify(token, process.env.My_JWT_secret);
        if (verified.exp < currentTime) return res.status(401).json({success:false,msg:"Session token expired"});
        req.body = { ...body, user: verified.id };
        next()
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
