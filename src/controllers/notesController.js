import Note from '../models/note.js';
import createHttpError from 'http-errors';

// GET /note
export const getAllNotes = async (req, res) => {
  const { tag, search } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.perPage, 10) || 10;

  let query = Note.find();
  if (tag) {
    query = query.where('tag').equals(tag);
  }
  if (search) {
    query = query.where({ $text: { $search: search } });
  }

  const skip = (page - 1) * perPage;
  const limitedQuery = query.skip(skip).limit(perPage);
  const [notes, totalNotes] = await Promise.all([
    limitedQuery.exec(),
    Note.countDocuments(query.getQuery()),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

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
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

// POST /note
export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

// PATCH /note/:noteId
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
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
  const deletedNote = await Note.findByIdAndDelete(noteId);
  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(deletedNote);
};
