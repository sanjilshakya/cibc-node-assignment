import moment from "moment";
import Transaction from "../models/transaction.js";

const transactionService = (() => {
  const getTrasaction = (params) => {
    return new Promise(async (resolve, reject) => {
      const startDate = moment(params.startDate, "DD/MM/YYYY").toDate().getTime();
      const endDate = moment(params.endDate, "DD/MM/YYYY").toDate().getTime();
      const transactions = await Transaction.find(startDate && endDate ? {
        date: { $gte: startDate, $lte: endDate },
      } : null).select("id date Comments");

      let result = transactions
        .map((trans) => {
          trans = trans.toJSON();
          trans.date = +trans.date;
          return trans;
        })
        .sort((a, b) => a.date - b.date);

      resolve(params.sortBy === 'desc' ? result.reverse() : result);
    });
  };

  const getTrasactionById = async (_id) => {
   let transaction = await Transaction.findById({ _id }).select("id date Comments");
   transaction = transaction.toJSON();
   transaction.date = +transaction.date;
   return transaction;
  }

  const createTransaction = async (data) => {
    const totalItem = await Transaction.count()
    data.id = (totalItem + 1).toString()
    const newTransaction = new Transaction(data)
    return await newTransaction.save()
  }

  const updateTransaction = (_id, data) => {
    return Transaction.findOneAndUpdate({ _id }, data, { new: true })
  }

  return {
    getTrasaction,
    getTrasactionById,
    createTransaction,
    updateTransaction
  };
})();

export default transactionService;
