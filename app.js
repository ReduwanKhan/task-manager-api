import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import {
  DATABASE,
  REQUEST_NUMBER,
  REQUEST_TIME,
  WEB_CACHE,
} from "./app/config/config";
import router from "./routes/api.js";

const app = express();

//App use Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

//App use limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

//Cache
app.set("etag", WEB_CACHE);

//Database Connect
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB Not Connected");
  });

app.use("/api", router);
