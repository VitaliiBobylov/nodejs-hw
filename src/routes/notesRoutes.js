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
router.get('/note', getAllNotes);

// GET /notes/:noteId
router.get('/note/:noteId', getNoteById);

// POST /notes
router.post('/note', createNote);

// PATCH /notes/:noteId
router.patch('/note/:noteId', updateNote);

// DELETE /notes/:noteId
router.delete('/note/:noteId', deleteNote);

export default router;
