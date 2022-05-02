const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  name: String,
  description: String,
  topImage: String,
  images: [String]
})

const Page = mongoose.model('Page', pageSchema)

module.exports = Page