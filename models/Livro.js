const mongoose = require('mongoose')

const livroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  publishedYear: { type: Number},
  genre: { type: String },
  pages: { type: Number} ,
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  description: { type: String },
  language: {
    type: String,
    default: 'pt-BR'
  },
  publisher: { type: String }
})

const Livro = mongoose.model('livro', livroSchema)

module.exports = { Livro, livroSchema }