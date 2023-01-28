import mongoose from "mongoose";
import mongooseLong from "mongoose-long";
import RecipientSchema from "./recipient.js";
import SenderSchema from "./sender.js";
mongooseLong(mongoose);

const transactionsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    date: { type: mongoose.Schema.Types.Long, required: true },
    sender: { type: SenderSchema, required: true },
    recipient: { type: RecipientSchema, required: true },
    Amount: { type: mongoose.Schema.Types.Number, required: true },
    CurrencyCd: { type: String, required: true },
    Comments: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("Transaction", transactionsSchema);
export default transactionsModel;
