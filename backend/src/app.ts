import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import type { Sequelize } from "sequelize";
import { destinations, notifications } from "./config/index.ts";
import type { INotificationWSReceivedMsg } from "../types.ts";
import { sendWSNotification } from "./utils/index.ts";
import authRouter from "./routes/auth.ts";
import auth from "./middleware/auth.ts";
import { db } from "../models/index.ts";

const PORT = 3001;
const baseRoutePath = "/api";
const app = express();

app.use(cors());

app.get(`${baseRoutePath}/destinations`, (req, res) => {
  res.json({ destinations });
});

app.get(`${baseRoutePath}/notifications`, (req, res) => {
  res.json({ notifications });
});

app.use(`${baseRoutePath}/auth`, authRouter);

app.get("/profile", auth, (req, res) => {
  res.send("This is a protected route");
});

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await (db?.sequelize as Sequelize | undefined)?.authenticate();
    console.log("Connection to db established");
  } catch (e) {
    console.log("Unable to connect to db: ", JSON.stringify(e));
  }
});

const wsServer = new WebSocketServer({
  server,
  path: `${baseRoutePath}/update-notifications`,
});

wsServer.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    const msgObj = JSON.parse(msg.toString()) as INotificationWSReceivedMsg;
    if (msgObj.type === "mark-read") {
      const notification = notifications.find((item) => item.id === msgObj.id);
      if (notification) {
        notification.isRead = true;
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  setTimeout(() => {
    sendWSNotification({
      text: "Турция остается наиболее популярным направлением для туризма в 2025 году.",
      notifications,
      ws,
    });
  }, 10000);

  setTimeout(() => {
    sendWSNotification({
      text: "Карты 'Мир' заработают в Таиланде в ближайшее время.",
      notifications,
      ws,
    });
  }, 40000);
});
