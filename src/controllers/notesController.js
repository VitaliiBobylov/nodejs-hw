import Notes from '../models/note.js';
import createHttpError from 'http-errors';

// GET /note

export const getAllNotes = async (req, res) => {
  const { tag, search } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.perPage, 10) || 10;
  const filter = {};
  if (tag) {
    filter.tag = tag;
  }
  if (search) {
    filter.$text = { $search: search };
  }

  const totalNotes = await Notes.countDocuments(filter);
  const totalPages = Math.ceil(totalNotes / perPage);
  const notes = await Notes.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

// GET /note/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

// POST /note
export const createNote = async (req, res) => {
  const newNote = await Notes.create(req.body);
  res.status(201).json(newNote);
};

// PATCH /note/:noteId
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await Notes.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });
  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(updatedNote);
};

// DELETE /note/:noteId
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Notes.findByIdAndDelete(noteId);
  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(deletedNote);
};
