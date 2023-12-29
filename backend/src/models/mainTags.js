const mongoose = require('mongoose')
const mainTagSchema = new mongoose.Schema({
    title : {type : String},
    image : {type : String},
    description : {type :String}

},{timestamps:true})
module.exports = mongoose.model('mainTags' ,mainTagSchema, 'mainTags' )