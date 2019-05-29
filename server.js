const express = require("express");

const databaseRouter = require("./posts/db_router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("    <h2>Lambda Chat API</h2><p>Welcome to the chat API</p>");
});

server.use("/api/posts", databaseRouter);

module.exports = server;
