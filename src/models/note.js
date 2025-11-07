// src/models/student.js

import { Schema, model } from 'mongoose';

const notesSchema = new Schema({
  title: 'trim: true',
  content: 'trim: true',
  tag: 'Todo',
});

export const Notes = model('Notes', notesSchema);

export default Notes;
