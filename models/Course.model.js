const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
  title: { type: String, required: false },
  content: { type: String },
  file: {
    url: String,
    type: String
  }
}, { _id: false });

const chapterSchema = new Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema]
}, { _id: false });

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: false},
  chapters: [chapterSchema],
  tags: [String],
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = model("Course", courseSchema);
