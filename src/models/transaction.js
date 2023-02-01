import mongoose from "mongoose";
import RecipientSchema from "./recipient.js";
import SenderSchema from "./sender.js";

const transactionsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    date: { type: Number, required: true },
    sender: { type: SenderSchema, required: true },
    recipient: { type: RecipientSchema, required: true },
    Amount: { type: Number, required: false, default: 0 },
    CurrencyCd: { type: String, required: false, default: 'CAD' },
    Comments: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("Transaction", transactionsSchema);
export default transactionsModel;
