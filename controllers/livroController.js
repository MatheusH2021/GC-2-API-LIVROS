const { Livro } = require('../models/Livro')
const { mongoose } = require('mongoose')

const livroController = {
  create: async (req, res) => {
    const livro = req.body
    if (!livro.title) {
      return res.status(400).json({ error: 'informe o campo obrigatorio: Title.' })
    }
    if (!livro.author) {
      return res.status(400).json({ error: 'informe o campo obrigatorio: Author.' })
    }
    if (await Livro.findOne({ isbn: livro.isbn })) {
      return res.status(400).json({ error: 'ISBN já cadastrado.' })
    }

    const response = await Livro.create(livro)
    res.status(201).json({ response, msg: 'Livro cadastrado!' })
  },

  readAll: async (req, res) => {
    try {
      const results = await Livro.find({})
      res.status(200).json(results)
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID do livro inválido' })
      }

      const livro = await Livro.findOne({ _id: id })

      if (!livro) {
        return res.status(404).json({ message: 'Livro não encontrado' })
      }

      await Livro.deleteOne( { _id : id })

      return res.status(204).send()
    } catch (error) {
      console.error(`[DELETE /livros/${req.params.id}]`, error)
      return res.status(500).json({
        message: 'Erro interno ao deletar livro'
      })
    }
  }

}

module.exports = livroController