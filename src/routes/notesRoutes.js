// src/routes/studentsRoutes.js

import { Router } from 'express';
import {
  getAllNotes,
  getNotesById,
  createNotes,
  updateNotesById,
} from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getAllNotes);

router.get('/notes/:noteId', getNotesById);

router.post('/notes', createNotes);

router.put('/notes/:noteId', updateNotesById);

export default router;
