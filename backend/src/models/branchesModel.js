const mongoose = require('mongoose')


const Schema = mongoose.Schema


const BranchAddressSchema = new Schema(
  {
    OfficeName: {
      type: String,
      minlength: [3, 'Office Name be must three characters long'],
      required: [true, 'Office name is required']
    },
    Address1: {
      type: String,
      required: [true]
    },
    Address2: {
        type: String,
        required: [true]
      },
    City: {
        type: String,
        required: [true]
      },
    State: {
        type: String,
        required: [true]
      },
    Pincode: {
        type: Number,
        required: [true,"Pincode must be a number"]
      },
    Email: {
        type: String,
        required: [true]
      }
  },
  { timestamps: true }
)


module.exports = mongoose.model('BranchAddress', BranchAddressSchema)


