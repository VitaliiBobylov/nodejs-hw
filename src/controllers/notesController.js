import Notes from '../models/note.js';
import createHttpError from 'http-errors';

// GET /note
export const getAllNotes = async (req, res) => {
  const notes = await Notes.find();
  res.status(200).json(notes);
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
