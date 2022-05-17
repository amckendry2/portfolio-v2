const mongoose = require('mongoose')

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/fresh-test')
    console.log('mongoose connected')
  } catch(err) {
    console.log(err)
  }
}

module.exports = connectToDatabase
