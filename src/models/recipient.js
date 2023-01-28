import mongoose from "mongoose";

const RecipientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  accountNumber: String,
  bank: String,
});

export default RecipientSchema;
