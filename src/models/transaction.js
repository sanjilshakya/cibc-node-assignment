import mongoose from "mongoose";
import mongooseLong from "mongoose-long";
import RecipientSchema from "./recipient.js";
import SenderSchema from "./sender.js";
mongooseLong(mongoose);

const transactionsSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.Number, required: true },
    date: { type: mongoose.Schema.Types.Long, required: true },
    sender: { type: SenderSchema, required: false },
    recipient: { type: RecipientSchema, required: false },
    Amount: { type: mongoose.Schema.Types.Number, required: false },
    CurrencyCd: { type: String, required: false },
    Comments: { type: String, required: true },
    status: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("Transaction", transactionsSchema);
export default transactionsModel;
