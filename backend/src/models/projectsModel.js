const mongoose = require("mongoose");
const schema = mongoose.Schema;

const projectSchema = new schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "types",
    // required: [true, "types field is required"],
  },
  heroImg: {
    type: [{}],
    // required: [true, "Hero image is required"],
  },
  picOne: {
    type: [{}],
    // required: [true, "picOne is required"],
  },
  picTwo: {
    type: [{}],
    // required: [true, "picTwo is required"],
  },

  sustainableAccreditation: {
    type: String,
    // required: [true, "Sustainable Accreditation is required"],
  },

  name: {
    type: String,
    // required: [true, "Name field is required"],
  },
  buildUpArea: {
    type: String,
    trim: true,
    // required: [true, "Built-up Area field is required"],
  },
  client: {
    type: String,
    trim: true,
    // required: [true, "Client field is required"],
  },

  status: {
    type: String,
    trim: true,
    // required: [true, "Status field is required"],
  },
  location: {
    city: {
      trim: true,
      type: String,
      // required: [true, "City field is required"],
    },
    state: {
      trim: true,
      type: String,
      // required: [true, "State field is required"],
    },
    country: {
      trim: true,
      type: String,
      // required: [true, "Country field is required"],
    },
  },
  propertyGallery: {
    type: [{}],
    required: [true, "Property photos is required"],
  },
  description: {
    type: String,
    // required: [true, "Description field is required"],
  },

  concept: {
    type: String,
    // required: [true, "Concept field is required"],
  },
  sources: {
    type: String,
    // required: [true, "sources is required"],
  },
  startingDate : {
    type : Date,
    // default : Date.now()

  },
  completionDate : {
    type : Date,
    // default : Date.now()
  }
});

module.exports = mongoose.model("projectSchema", projectSchema);
