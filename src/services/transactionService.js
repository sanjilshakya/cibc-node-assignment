import moment from "moment";
import Transaction from "../models/transaction.js";

const transactionService = (() => {
  const getTrasaction = (params) => {
    return new Promise(async (resolve, reject) => {
      if (!params.startDate || !params.endDate) {
        reject("Please provide start date and end date.");
        return;
      }

      const startDate = moment(params.startDate, "DD/MM/YYYY")
        .toDate()
        .getTime();
      const endDate = moment(params.endDate, "DD/MM/YYYY").toDate().getTime();

      const transactions = await Transaction.find({
        date: { $gte: startDate, $lte: endDate },
      }).select("id date Comments -_id");

      let result = transactions
        .map((trans) => {
          trans = trans.toJSON();
          trans.date = +trans.date;
          trans.displayDate = moment(new Date(trans.date)).format(
            "DD/MM/YYYY hh:mm A"
          );
          return trans;
        })
        .sort((a, b) => a.date - b.date);

      resolve(params.isDesc ? result.reverse() : result);
    });
  };

  return {
    getTrasaction,
  };
})();

export default transactionService;
