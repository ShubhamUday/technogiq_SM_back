const router = require("express").Router();
const studentMiddleware = require("../middlewares/studentMiddleware");
const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");

// Add student
router.post("/add-student", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    res.send({
      success: true,
      message: "New Student has been added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all students
router.get("/get-all-students", async (req, res) => {
  try {
    const allStudent = await Student.find();

    res.send({
      success: true,
      message: "All students have been fetched",
      data: allStudent,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get student by Id
router.post("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.send({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update a student
router.put("/update-student", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.body.studentId,
      req.body
    );
    res.send({
      success: true,
      message: "The student has been updated!",
      data: student,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Delete a student
router.put("/delete-student", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.body.studentId);
    console.log(req.body.studentId);

    res.send({
      success: true,
      message: "The student has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Get students of a specific class
router.post("/get-all-students-by-class", async (req, res) => {
  try {
    const allStudents = await Student.find({ class: req.body.class });

    res.send({
      success: true,
      message: "All students fetched successfully !",
      data: allStudents,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const student = await Student.findOne({ name: req.body.name });

    if (!student) {
      return res.send({
        success: false,
        message: "You are not registered student contact your teacher",
      });
    }
    if (student.password !== req.body.password) {
      return res.send({
        success: false,
        message: "Password do not match",
      });
    }
    console.log("sigin student", student._id);

    const token = jwt.sign(
      { studentId: student._id },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "1d" }
    );

    console.log("token during signin student", token);

    res.send({
      success: true,
      user: student,
      message: "Student logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-current-student", studentMiddleware, async (req, res) => {
  const student = await Student.findById(req.body.studentId).select(
    "-password"
  );
  console.log("get-current route student", student);

  res.send({
    success: true,
    message: "Student Authorised for Protected Route",
    data: student,
  });
});

module.exports = router;

// // Student
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOiI2N2U3OWEyYWNjNzZlMjMyNzJkY2ZiZDciLCJpYXQiOjE3NDMzOTk3MjIsImV4cCI6MTc0MzQ4NjEyMn0.cV1qNbisDR6jwYGwj20U93A_w2-MYp48oqOWt9CeoiA
// // Admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjdlNTA0NWQwODRjZDBhOTUxMGJkMDAxIiwiaWF0IjoxNzQzNDA1ODQ0LCJleHAiOjE3NDM0OTIyNDR9.CdGYR9DlbxIEFApfDeAUhIRvuQVYHNEEQa-lDq45ZMg

