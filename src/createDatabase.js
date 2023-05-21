const mongoose = require('mongoose')
const channelModel = require('./models/subscribers')
const data = require('./data')

// Connect to DATABASE
// const DATABASE_URL = "mongodb+srv://arrocket68:ankur@my-blog.xdomcvc.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_URL = "mongodb+srv://arrocket68:ankur@my-blog.xdomcvc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    await channelModel.deleteMany({})
    // console.log(connection)
    await channelModel.insertMany(data)
    await mongoose.disconnect();
}
refreshAll()