import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { destinations, notifications } from "./config/index.js";
import type { INotificationWSReceivedMsg } from "./types.js";
import { sendWSNotification } from "./utils/index.js";
import authRouter from "./routes/auth.js";
import auth from "./middleware/auth.js";
import { sequelize } from "./models/index.js";

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
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", JSON.stringify(e));
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
