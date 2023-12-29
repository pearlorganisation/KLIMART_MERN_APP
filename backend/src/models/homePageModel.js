const mongoose = require('mongoose')


const Schema = mongoose.Schema


const HomePageSchema = new Schema(
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
    },
    Image: {
      type: [String],
      // required: [true, "Image photos is required"]
    }
  },
  {timestamps:true}
  // { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)


module.exports = mongoose.model('HomePage', HomePageSchema)
