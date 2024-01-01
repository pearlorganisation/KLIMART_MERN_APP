const mongoose = require('mongoose')


const Schema = mongoose.Schema


const ClientelleSchema = new Schema(
  {
    Image: {
      type: [String],
      // required: [true, "Image photos is required"]
    }
  },
  { timestamps: true }
)


module.exports = mongoose.model('Clientelle', ClientelleSchema)
