import jwt from "jsonwebtoken"
export const auth = async (req, res, next) => {
    try {
        const getToken = req.headers.authorization;
        if (!getToken) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const token = getToken.split(" ")[1];
        if (!token)

            return res.status(401).json({ success: false, message: "you dont have preamation" });
        const decodToken = jwt.verify(token, "secret");
        req.user = decodToken
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}