import moment from "moment";
import Transaction from "../models/transaction.js";

const transactionService = (() => {

  const getTransactions = (query) => {
    return new Promise(async (resolve, reject) => {
      let { limit, page, sortBy, sortType, startDate, endDate } = query
      limit = +limit
      page = +page
      const skip = ((page ?? 1) - 1) * limit
      const sortQuery = { [sortBy || 'date']: sortType === 'asc' ? 1 : -1 }
      const condition = {
        date: { $gte: startDate, $lte: endDate },
        status: { $in: ['IN-PROGRESS', 'COMPLETED', 'PENDING'] }
      }
      !(startDate || endDate) && delete condition.date

      const transactions = await Transaction.find(condition)
        .select('id date Comments status')
        .sort(sortQuery)
        .skip(skip)
        
      resolve(transactions)
    })
  }

  const getTrasactionById = async (_id) => {
    return await Transaction.findById({ _id }).select("id date Comments sender recipient status");
  }

  const createTransaction = async (data) => {
    data.id = await Transaction.count()
    data.id++
    const newTransaction = new Transaction(data)
    return await newTransaction.save()
  }

  const updateTransaction = (_id, data) => {
    return Transaction.findOneAndUpdate({ _id }, data, { new: true })
  }

  return {
    getTransactions,
    getTrasactionById,
    createTransaction,
    updateTransaction
  };
})();

export default transactionService;
