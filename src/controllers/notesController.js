import Note from '../models/note.js';
import createHttpError from 'http-errors';

// GET /notes
export const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  const { tag, search } = req.query;

  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.perPage, 10) || 10;
  const skip = (page - 1) * perPage;
  const query = Note.find().where('userId').equals(userId);

  if (tag) {
    query.where('tag').equals(tag);
  }

  if (search) {
    query.where({
      $text: { $search: search },
    });
  }

  query.skip(skip).limit(perPage);

  const [notes, totalNotes] = await Promise.all([
    query.exec(),
    Note.countDocuments({
      userId,
      ...(tag && { tag }),
      ...(search && { $text: { $search: search } }),
    }),
  ]);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPage),
    notes,
  });
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

// POST /notes
export const createNote = async (req, res) => {
  const userId = req.user._id;

  const note = await Note.create({
    ...req.body,
    userId,
  });

  res.status(201).json(note);
};

// PATCH /notes/:noteId
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    req.body,
    { new: true },
  );

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    userId,
  });

  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(deletedNote);
};
