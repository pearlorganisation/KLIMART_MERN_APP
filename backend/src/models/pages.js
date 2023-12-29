const { object } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const pageSchema = new schema(
  {
    page_name: {
      type: String,
      // required: [true, "topic field is required"],
    },
    content: {
      type: String,
      // required: [true, "content field is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("page", pageSchema);
