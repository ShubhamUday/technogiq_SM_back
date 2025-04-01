const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  password: { type: String, require: true },
  gender: { type: String, require: true },
  number: { type: Number, require: true },
  class: { type: String, require: true },
});

const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;
