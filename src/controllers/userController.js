import createHttpError from 'http-errors';
import User from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file');
    }
    const uploaded = await saveFileToCloudinary(req.file.buffer);


    const user = await User.findById(req.user.id);
    user.avatar = uploaded.secure_url;
    await user.save();

    res.status(200).json({ url: uploaded.secure_url });

  } catch (err) {
    next(err);
  }
};
