import express, { json } from "express";
import healthCheckRoute from "./healthCheck.route.js";
import authRoute from "./auth.route.js"
import adminRoute from "./admin.route.js";
const apiRoutes = express.Router();

apiRoutes.use("/health", healthCheckRoute);
apiRoutes.use("/auth", authRoute);
apiRoutes.use("/admin", adminRoute);







export default apiRoutes;