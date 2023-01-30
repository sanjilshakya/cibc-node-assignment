import express from "express";
import transactionController from "./controllers/transactionController.js";

const route = express.Router();

route.get('/', (req, res) => {
    res.json({
        API: 'TEST: CIBC Rest API'
    });
});

route.use("/transactions", transactionController);

export default route;
