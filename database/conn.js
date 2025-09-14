const mongoose = require("mongoose");
require('dotenv').config();

async function main() {
    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB!");
    } catch(err) {
        console.error("Erro ao conectar", err);
    }
}

module.exports = main;