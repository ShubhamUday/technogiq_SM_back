const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
    topic:{ type: String, require: true},
    description:{type:String, require:true}
})

const NoticeModel = mongoose.model('notice', noticeSchema)

module.exports = NoticeModel