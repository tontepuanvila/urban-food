import jwt from "jsonwebtoken";

/**
 * Middleware function to authenticate requests.
 * It checks for a valid JWT token in the request headers.
 * If the token is valid, it decodes the token and attaches the user ID to the request object.
 * If the token is not present or invalid, it returns an error response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function to be called.
 */
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;  // Get token from headers

    // If no token is provided, return an unauthorized error
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        // Verify and decode the token using the JWT secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request body for further use
        req.body.userId = token_decode.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs during token verification, send an error response
        res.json({ success: false, message: error.message });
    }
}

export default authMiddleware;
