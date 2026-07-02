import Note from "../models/Note.js";
import asyncHandler from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const note = await Note.create({
    title,
    content,
    category,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    notes,
  });
});
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  note.title = title || note.title;
  note.content = content || note.content;
  note.category = category || note.category;
  await note.save();

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  await note.deleteOne();

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
export { createNote, getNotes, updateNote, deleteNote };
