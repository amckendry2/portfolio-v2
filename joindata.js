const Category = require('./server/models/Category')
const Page = require('./server/models/Page')
const dbConnect = require('./server/utils/db')

const main = async() => {
  await dbConnect()
  console.log('connected')
  const pages = await Page.find({})
  const pageIds = pages.map(p => p.id)
  const illustration = new Category({
    name: 'illustration',
    pages: pageIds
  })
  await illustration.save()
  const design = new Category({
    name: 'design',
    pages: pageIds
  })
  await design.save()
  console.log('done')
}
