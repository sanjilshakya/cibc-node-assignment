import mongoose from "mongoose";

const SenderSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: String,
  IDNumber: String,
});

export default SenderSchema;
