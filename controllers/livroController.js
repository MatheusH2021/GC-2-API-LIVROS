const {Livro: LivroModel, Livro} = require("../models/Livro");

const livroController = {
    create: async(req, res)=> {
        const livro = req.body;
        if (livro.title == "") {
            return res.status(400).json({ error: "informe o campo obrigatorio: Title." });
        } else if (livro.author == "") {
            return res.status(400).json({ error: "informe o campo obrigatorio: Author." });
        } else if (await LivroModel.findOne( { isbn: livro.isbn })) {
            return res.status(400).json({ error: "ISBN já cadastrado." });
        }

        const response = await LivroModel.create(livro);
        res.status(201).json({response, msg:"Livro cadastrado!"});

    },

    readAll: async(req, res)=> {
        let results = await LivroModel.find({});
        res.send(results).status(200);
    }
}

module.exports = livroController