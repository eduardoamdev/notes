const express = require("express");
const userRouter = express.Router();

const User = require("../models/User");
const Note = require("../models/Note");

userRouter.get("/validate", (req, res) => {
  res.json({
    success: true,
    message: "Token has been validated",
  });
});

userRouter.get("/session", async (req, res) => {
  try {
    let userId = req.userId;

    let user = await User.findById(userId, { password: 0 });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
});

userRouter.post("/createNote", async (req, res) => {
  try {
    let { title, content, date } = req.body;
    let userId = req.userId;
    if (title === "" || content === "" || date === "") {
      return res.json({
        success: false,
        infoError: true,
        message: "Fill the fields properly",
      });
    }
    let newNote = await Note.create({
      user: userId,
      title,
      content,
      date,
    });
    let id = newNote._id;
    await User.findByIdAndUpdate(userId, {
      $push: { notes: id },
    });
    res.json({
      success: true,
      infoError: false,
      id: newNote._id,
    });
  } catch (error) {
    res.json({
      success: false,
      infoError: false,
      message: "Server error",
    });
  }
});

userRouter.get("/notes", async (req, res) => {
  try {
    let userId = req.userId;
    let notes = await Note.find({ user: userId }).select("title date").sort({
      date: 1,
    });

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
});

userRouter.get("/note/:noteId", async (req, res) => {
  try {
    let id = req.params.noteId;
    let note = await Note.findById(id).select("date title content");
    res.json({
      success: true,
      note,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
});

userRouter.put("/updateNote/:noteId", async (req, res) => {
  try {
    let id = req.params.noteId;
    let { date, title, content } = req.body;
    if (title === "" || content === "" || date === "") {
      return res.json({
        success: false,
        infoError: true,
        message: "Fill de form properly",
      });
    }
    await Note.findByIdAndUpdate(id, {
      title,
      content,
      date,
    });
    res.json({
      success: true,
      infoError: false,
    });
  } catch (error) {
    res.json({
      success: false,
      infoError: false,
      message: "Server error",
    });
  }
});

userRouter.delete("/deleteNote/:noteId", async (req, res) => {
  try {
    let id = req.params.noteId;
    let userId = req.userId;
    await Note.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, {
      $pull: { notes: id },
    });
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = userRouter;
