// src/models/student.js

import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Notes = model('Notes', notesSchema);
