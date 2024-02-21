import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };

import auth from "./middleware/auth.js";

import AuthRouter from "./routers/authRouter.js";
import StaffRouter from "./routers/staffRouter.js";
import StaffTimesheetRouter from "./routers/staffTimesheetRouter.js";
import WorkstationRouter from "./routers/workstationRouter.js";
import WorkstationSettingRouter from "./routers/workstationSettingRouter.js";
import AppRouter from "./routers/appRouter.js";

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

app.get("/", (req, res) => res.json({ running: true }));
app.use("/auth", AuthRouter);
app.use("/staff", auth, StaffRouter);
app.use("/timesheet", auth, StaffTimesheetRouter);
app.use("/workstation", auth, WorkstationRouter);
app.use("/workstation-setting", auth, WorkstationSettingRouter);
app.use("/app", auth, AppRouter);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
