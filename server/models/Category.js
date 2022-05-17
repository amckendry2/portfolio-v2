const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: String,
  pages: [{
    type: mongoose.Types.ObjectId,
    ref: 'Page'
  }],
  sortNum: Number
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category