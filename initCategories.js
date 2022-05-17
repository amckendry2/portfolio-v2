const Category = require('./server/models/Category')
const dbConnect = require('./server/utils/db')

const main = async() => {
  await dbConnect()
  console.log('connected')
  await Category.deleteMany();
  const illustration = new Category({
    name: 'illustration',
    pages: [],
    sortNum: 1
  })
  await illustration.save()
  const design = new Category({
    name: 'design',
    pages: [],
    sortNum: 0 
  })
  await design.save()
  console.log('done')
}

main();