const mongoose = require("mongoose");
const schema = mongoose.Schema;

const typeSchema = new schema(
  {
    type_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("types", typeSchema);
