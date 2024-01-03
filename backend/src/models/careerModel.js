// const express = require("express");
const mongoose = require("mongoose");

//  = customErrorMessages;
const statusEnum = ["unseen", "seen", "contracted", "rejected"];
const statusCodeEnum = [0, 1, 2, 3];

const CareerSchema = new mongoose.Schema({
  date: String,
  fname: {
    type: String,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  education: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
  },
  contact: {
    type: Number,
  },
  role: {
    type: String,
    // required: [true, "role is required"],
  },
  statusDetails: { type: String, default: "unseen" },
  experience: {
    type: Number,
  },
  cv: { type: String },
});
const CareerModel = mongoose.model("Carrer", CareerSchema);
module.exports = { CareerModel };
