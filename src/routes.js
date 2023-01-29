import express from "express";
import transactionController from "./controllers/transactionController.js";

const route = express.Router();

route.use("/transactions", transactionController);

export default route;
