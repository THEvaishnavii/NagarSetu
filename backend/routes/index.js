import express, { json } from "express";
import healthCheckRoute from "./healthCheck.route.js";


const apiRoutes = express.Router();

apiRoutes.use("/health", healthCheckRoute);







export default apiRoutes;