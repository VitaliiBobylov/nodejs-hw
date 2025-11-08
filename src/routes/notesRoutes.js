import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

const router = Router();

// GET /notes
router.get('/', getAllNotes);

// GET /notes/:noteId
router.get('/:noteId', getNoteById);

// POST /notes
router.post('/', createNote);

// PATCH /notes/:noteId
router.patch('/:noteId', updateNote);

// DELETE /notes/:noteId
router.delete('/:noteId', deleteNote);

export default router;
