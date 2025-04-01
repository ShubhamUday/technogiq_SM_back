const router = require("express").Router();
const Notice = require("../models/noticeModel");

// Add notice
router.post("/add-notice", async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    await newNotice.save();

    res.send({
      success: true,
      message: "New notice has been added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-notices", async (req, res) => {
  try {
    const allNotice = await Notice.find();

    res.send({
      success: true,
      message: "All notices have been fetched",
      data: allNotice,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/notice/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    res.send({
      success: true,
      message: "Notice fetched successfully",
      data: notice,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update a notice
router.put("/update-notice", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.body.noticeId,
      req.body
    );
    res.send({
      success: true,
      message: "The notice has been updated!",
      data: notice,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Delete a notice
router.put("/delete-notice", async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.body.noticeId);
    console.log(req.body.noticeId);

    res.send({
      success: true,
      message: "The notice has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
