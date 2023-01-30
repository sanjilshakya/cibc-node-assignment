import express from "express";
import transactionService from "../services/transactionService.js";
import httpHelper from "../utils/httpHelper.js";

const route = express.Router();

route.get("/", (req, res) => {
  transactionService.getTransactions(req.query)
    .then((result) => {
      httpHelper.success(res, result);
    })
    .catch((err) => httpHelper.error(res, err));
});

route.get('/:id', async (req, res) => {
  try {
    const transaction = await transactionService.getTrasactionById(req.params.id)
    httpHelper.success(res, transaction);
  } catch (error) {
    httpHelper.error(res, error);
  }
})

route.post('/', async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.body)
    httpHelper.success(res, transaction);
  } catch (error) {
    httpHelper.error(res, error);
  }
})

route.put('/:id', async (req, res) => {
  try {
    const transaction = await transactionService.updateTransaction(req.params.id, req.body)
    httpHelper.success(res, transaction);
  } catch (error) {
    httpHelper.error(res, error);
  }
})

export default route;
