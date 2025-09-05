import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { destinations, notifications } from "./config/index.js";
import type { INotificationWSReceivedMsg } from "./types.js";
import { sendWSNotification } from "./utils/sendWSNotification.js";

const PORT = 3001;
const baseRoutePath = "/api";
const app = express();

app.use(cors());

app.get(`${baseRoutePath}/destinations`, (request, response) => {
  response.json({ destinations });
});

app.get(`${baseRoutePath}/notifications`, (request, response) => {
  response.json({ notifications });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
