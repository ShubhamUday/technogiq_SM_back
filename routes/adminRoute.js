const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ userName: req.body.userName });

    if (adminExists) {
      res.send({ success: false, message: "Admin already exists" });
    }
    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newAdmin = await Admin(req.body);
    await newAdmin.save();

    res.send({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const admin = await Admin.findOne({ userName: req.body.userName });
    console.log("admin", admin);

    if (!admin) {
      return res.send({
        success: false,
        message: "You are not registered please register first",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid entered",
      });
    }

    console.log("signin admin", admin._id);

    const token = jwt.sign(
      { adminId: admin._id },
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: "1d",
      }
    );

    console.log("token during signin admin", token);

    res.send({
      success: true,
      user: admin,
      message: "Admin logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-current-admin", authMiddleware, async (req, res) => {
  const admin = await Admin.findById(req.body.adminId).select("-password");
  // console.log( 'get-current', admin);

  res.send({
    success: true,
    message: "Admin Authorised for Protected Route",
    data: admin,
  });
});

router.get("/get-all-admins", async (req, res) => {
  try {
    const allAdmins = await Admin.find();

    res.send({
      success: true,
      message: "All admins have been fetched !",
      data: allAdmins,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
