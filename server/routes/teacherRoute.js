const router = require("express").Router();
const Teacher = require("../models/teacherModel");

// Add Teacher
router.post("/add-teacher", async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();

    res.send({
      success: true,
      message: "New Teacher has been added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-teachers", async (req, res) => {
  try {
    const allTeacher = await Teacher.find();

    res.send({
      success: true,
      message: "All teachers have been fetched",
      data: allTeacher,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    res.send({
      success: true,
      message: "Teacher fetched successfully",
      data: teacher,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update a teacher
router.put("/update-teacher", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.body.teacherId,
      req.body
    );
    res.send({
      success: true,
      message: "The teacher has been updated!",
      data: teacher,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Delete a teacher
router.put("/delete-teacher", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.body.teacherId);
    console.log(req.body.teacherId);

    res.send({
      success: true,
      message: "The teacher has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});




module.exports = router;
