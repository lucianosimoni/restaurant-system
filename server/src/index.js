import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import authenticate from "./middleware/authenticate.js";
import staffRouter from "./routers/staff.js";
// import interviewRouter from "./routers/interview.js";

dotenv.config();

const app = express();
const port = 3000;

const whitelist = process.env.WHITELIST.split(",");
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(`🔴⚠️ Not allowed by CORS from origin: ${origin}`, false);
  },
};
// app.use(cors(corsOptions));
app.use(cors()); // FIXME: Only for Dev purposes!

app.use(morgan("dev"));
app.use(express.json());

app.use("/staff", staffRouter);
// app.use("/interview", authenticate, interviewRouter);

app.get("/", (req, res) => {
  res.json({ running: true });
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
