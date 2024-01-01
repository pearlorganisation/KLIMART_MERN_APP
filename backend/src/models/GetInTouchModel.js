// const express = require("express");
const mongoose = require("mongoose");
const statusEnum = ["unseen", "seen", "contracted", "rejected"];
const statusCodeEnum = [0, 1, 2, 3];
const GetInTouchSchema = new mongoose.Schema({
  bhk: Number,
  budget: Number,
  area: String,
  location: String,
  name: String,
  contact: String,
  email: String,
  category: String,
  subCategory: String,
  statusDetails: { type: String, default: "unseen" },
});
const GetInTouchModel = mongoose.model("GetInTouch", GetInTouchSchema);
module.exports = { GetInTouchModel };
