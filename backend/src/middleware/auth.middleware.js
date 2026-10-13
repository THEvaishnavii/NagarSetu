
import { verifyToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  // 1. Read the Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check whether the header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  // 3. Extract the token
  const token = authHeader.slice(7);

  try {
    // 4. Verify the token
    const payload = verifyToken(token);

    // 5. Attach user details to the request
    req.user = {
      id: payload.id,
      role: payload.role,
    };

    // 6. Continue to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}



export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
