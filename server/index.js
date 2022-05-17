const express = require('express')
const aws = require('aws-sdk')
const dbConnect = require('./utils/db')
const Category = require('./models/Category')
const Page = require('./models/Page')
require('./models/Page')

const app = express()
app.use(express.json())

dbConnect()

app.get('/category', async (req, res) => {
  const categoryData = await 
    Category
      .find({})
      .populate({
        path: 'pages',
        sort: 'sortNum',
        populate: {
          path: 'images',
          sort: 'sortNum'
        }
      })
      .sort('sortNum')
  return res.status(200).json(categoryData)
})

app.get('/category/:category', async (req, res) => {
	const categoryName = req.params.category 
  const categoryData = await 
    Category
      .findOne({name: categoryName})
      .populate('pages')
	return res
		.status(200)
		.json(categoryData)
})

app.get('/s3-test', (req, res) => {
  const S3_BUCKET = process.env.S3_BUCKET;
  const s3 = new aws.S3();
  const { fileName, fileType } = req.query
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  }
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.send(err);
    }
    return res.json({
      signedUrl: data,
      imgUrl: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    })
  })
})

app.put('/page/addImage/:pageName', async (req, res) => {
  const { imgUrl } = req.body;
  // const { pageName } = req.params;
  // const page = Page.findOne({name: pageName});
  const page = await Page.findOne({});
  page.images.unshift(imgUrl);
  await page.save(); 
  res.send(page);
})



module.exports = app