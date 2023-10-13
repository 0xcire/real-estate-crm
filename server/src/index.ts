import express from "express";

import cors from "cors";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import compression from "compression";

import dotenv from "dotenv";

import { sql } from "drizzle-orm";

import router from "./router";

dotenv.config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 1337;
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`DOCKER: http://localhost:8080 \n NON-DOCKER: http://localhost:5173`);
  } else {
    console.log("running in prod");
  }
});

app.use("/", router());

async function close() {
  console.log("closing...");
  await sql`sql.end( {timeout: 5 })`;
  await new Promise((r) => server.close(r));
}

process.on("SIGINT", close);
process.on("SIGTERM", close);
// process.on("warning", (e) => console.warn(e.stack));
