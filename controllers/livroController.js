const {Livro: LivroModel, Livro} = require("../models/Livro");

const livroController = {
    readAll: async(req, res)=> {
        let results = await LivroModel.find({});
        res.send(results).status(200);
    }
}

module.exports = livroController