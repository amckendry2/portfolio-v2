const testPageData = require('./testPageData.json')

const express = require('express')
const app = express()

app.use(express.json())

app.get('/pages/:category', (req, res) => {
	const category = req.params.category 
	return res
		.status(200)
		.json(testPageData.find(o => o.category === category))
})

module.exports = app