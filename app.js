import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import {
  MAX_JSON_SIZE,
  REQUEST_TIME,
  REQUEST_LIMIT,
  WEB_CACHE,
  DB,
  PORT,
} from "./app/config/config.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: MAX_JSON_SIZE}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_LIMIT});
app.use(limiter);
app.set("etag", WEB_CACHE);

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

import route from "./routes/api.js";
app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
