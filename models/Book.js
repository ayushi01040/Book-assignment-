const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  bookTitle: {
    type: String,
    required: true
  },
  bookAuthor: {
    type: String,
    required: true
  },
  publisherName: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  edition: {
    type: Number,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  origin: {
    type: String,
    required: true
  },
  noOfPages: {
    type: Number,
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  lastLogin: { type: Date },
  createdAt: Date,
  updatedAt: Date
});

BookSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("Book", BookSchema);
