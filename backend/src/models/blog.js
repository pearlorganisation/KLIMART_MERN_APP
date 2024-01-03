const { object } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema(
  {
    date: {
      type: Date,
      default: new Date().getTime(),
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],  
    mainTags: { type: mongoose.Schema.Types.ObjectId, ref: "mainTags" },
    // main_tag :{
    //   type:String
    // },
    topic: {
      type: String,
      required: [true, "Topic field is required"],
    },
    subTopic: {
      type: String,
      required: [true, "Sub Topic is required"],
    },

    writer: {
      type: String,
      required: [true, "Writer field is required"],
    },
    content: {
      type: String,
      required: [true, "Content field is required"],
    },
    propertyGallery: {
      type: [String],
      required: [true, "Property photos is required"],
    },
    sources: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
