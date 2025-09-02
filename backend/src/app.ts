import express from "express";
import { destinations } from "./config/destinations.js";

const PORT = 3001;
const app = express();

app.get("/api/destinations", (request, response) => {
  response.json({ destinations });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
