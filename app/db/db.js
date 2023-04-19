const db = require('../models/index')
//MONGODB CONNECTION
module.exports = {
    mongoose: db.mongoose.connect(process.env.MONGODB_URL_APL, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}