const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, require: true },
  workExperience: { type: Number, require: true },
  number: { type: Number, require: true },
  address: { type: String, require: true },
  class: { type: String, require: true },
});

const TeacherModel = mongoose.model("teacher", teacherSchema);

module.exports = TeacherModel;
