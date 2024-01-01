const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tagSchema = new schema(
  {

    tags_name: {
      type: String,
      required: true,
    },
    // main_tag: { type: mongoose.Schema.Types.ObjectId, ref: "mainTags" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tags", tagSchema);
