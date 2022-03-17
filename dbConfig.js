require('dotenv').config()
const mongoose = require('mongoose')

mongoose
  .connect(process.env.DEV_DB)
  .then(() => {
    console.log('We are connected to our database')
  })
  .catch((error) => {
    console.log(`The following error has ocurred: ${error}`)
  })
