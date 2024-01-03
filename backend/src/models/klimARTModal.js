const mongoose = require('mongoose')


const Schema = mongoose.Schema


const klimARTSchema = new Schema(
  {
    header: {
      type: String,
      // minlength: [3, 'Name must be three characters long'],
      trim: true,
      // unique: true,
      // required: [true, 'Title is required']
    },
    Desc: {
      type: String,
      // minlength: [3, 'Desc must be three characters long'],
      // required: [true, 'Desc is required']
    }
  },
  {timestamps: true }
)


module.exports = mongoose.model('klimART', klimARTSchema)
