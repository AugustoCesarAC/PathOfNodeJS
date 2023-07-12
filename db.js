const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://admin:123@cluster0.r6hjoxp.mongodb.net/employee_db?retryWrites=true&w=majority'

mongoose.connect(dbUri)

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri, {
        serverApi: {
          strict: true,
          deprecationErrors: true,
        }})
}