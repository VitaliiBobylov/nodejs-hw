import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// GET /notes
router.get('/notes', authenticate, celebrate(getAllNotesSchema), getAllNotes);

// GET /notes/:noteId
router.get(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  getNoteById,
);

// POST /notes
router.post('/notes', authenticate, celebrate(createNoteSchema), createNote);

// PATCH /notes/:noteId
router.patch(
  '/notes/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote,
);

// DELETE /notes/:noteId
router.delete(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote,
);

export default router;
