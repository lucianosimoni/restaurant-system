import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";

import auth from "./middleware/auth.js";
import authRouter from "./routers/auth.js";
import staffRouter from "./routers/staff.js";
import staffTimesheetRouter from "./routers/staffTimesheet.js";
import workstationRouter from "./routers/workstation.js";
import workstationSettingRouter from "./routers/workstationSetting.js";
import screenRouter from "./routers/screen.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };

const app = express();
const port = process.env.PORT;

const whitelist = process.env.WHITELIST.split(",");

app.use(compression());
// app.use(cors({
// origin: (origin, callback) => {
//   if (whitelist.indexOf(origin) !== -1) callback(null, true);
//   else callback(`🔴⚠️ Not allowed by CORS from origin: ${origin}`, false);
// }));
app.use(cors()); // FIXME: Only for Dev purposes!
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/staff", auth, staffRouter);
app.use("/timesheet", auth, staffTimesheetRouter);
app.use("/workstation", auth, workstationRouter);
app.use("/workstation-setting", auth, workstationSettingRouter);
app.use("/screen", auth, screenRouter);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

app.get("/", (req, res) => {
  res.json({ running: true });
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
