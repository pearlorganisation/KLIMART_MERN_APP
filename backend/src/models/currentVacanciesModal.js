const mongoose = require('mongoose')
const currentVacanciesSchema = new mongoose.Schema({
    role : {type : String},
    experience : {type : String},
    location : {type : String},
    description:{type:String}

},{timestamps : true})
module.exports = mongoose.model('currentVacancies' ,currentVacanciesSchema, 'currentVacancies')