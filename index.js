const express = require("express");
const database = require("./data/db");

const server = express();
server.use(express.json());
const port = "8000";

server.listen(port, () => {
  console.log(`API is running and server is listening on port ${port}`);
});
