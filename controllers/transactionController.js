import express from "express";
import transactionService from "../services/transactionService.js";
import httpHelper from "../utils/httpHelper.js";

const route = express.Router();

route.get("/", (req, res) => {
  try {
    transactionService
      .getTrasaction(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
