import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mainRouter from "./routes.js";
import configs from "./config.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", mainRouter);

const { PORT, DB_USERNAME, DB_PASSWORD } = configs

// mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ogcbhfp.mongodb.net/?retryWrites=true&w=majority`,
mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cibc.kk7z42t.mongodb.net/assignment?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });