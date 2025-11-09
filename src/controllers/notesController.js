import Notes from '../models/note.js';
import createHttpError from 'http-errors';

// GET /notes
export const getAllNotes = async (req, res) => {
  const notes = await Notes.find();
  res.status(200).json(notes);
};

// GET /notes/:noteId
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Notes.findById(noteId);
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// POST /notes
export const createNote = async (req, res, next) => {
  try {
    const newNote = await Notes.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// PATCH /notes/:noteId
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const updatedNote = await Notes.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
