import JWT from 'jsonwebtoken'

export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Login to proceed',
            });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).send({
            success: false,
            message: 'Invalid Credentials',
        });
    }
};