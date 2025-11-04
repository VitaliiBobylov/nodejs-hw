import Notes from "../models/note";




export const createNotes = async (req, res) => {
  const notes = await Notes.create(req.body);
  res.status(201).json(notes);
};

export const getAllNotes = async (req, res) => {
  const notes = await Notes.find();
  res.status(200).json(notes);
};

export const getNotesById = async (req, res) => {
  const { noteId } = req.params;
  const notes = await Notes.findById(noteId);
  res.status(200).json(notes);
};

export const updateNotesById = async (req, res) => {
  const { noteId } = req.params;
  const notes = await Notes.findByIdAndUpdate(noteId, req.body, { new: true });
  res.status(200).json(notes);
};
