const express = require("express");
const cors = require("cors");
const conn = require("../database/conn.js");
require('dotenv').config();

const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json());
conn();

const routes = require("../routes/router");
app.use("/api", routes);

app.listen(PORT, () => {
    console.log("API-LIVROS rodando na porta "+PORT);
});