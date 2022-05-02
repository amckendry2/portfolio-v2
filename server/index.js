const express = require('express')
const dbConnect = require('./utils/db')
const Category = require('./models/Category')
require('./models/Page')

const app = express()
app.use(express.json())

dbConnect()

app.get('/pages/:category', async (req, res) => {
	const categoryName = req.params.category 
  const categoryData = await 
    Category
      .findOne({name: categoryName})
      .populate('pages')
	return res
		.status(200)
		.json(categoryData)
})

module.exports = app