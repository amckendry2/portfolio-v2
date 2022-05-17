const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  name: String,
  description: String,
  topImage: String,
  images: [{
    type: mongoose.Types.ObjectId,
    ref: 'Image'
  }]
})

const Page = mongoose.model('Page', pageSchema)

module.exports = Page