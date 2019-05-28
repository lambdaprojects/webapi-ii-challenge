const express = require("express");

const database = require("./data/db.js");

const databaseRouter = require("./data/db_router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("    <h2>Lambda Chat API</h2><p>Welcome to the chat API</p>");
});

server.use("/api/blogs", databaseRouter);

module.exports = server;
