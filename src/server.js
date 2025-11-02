import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/notes', async (req, res) => {
  const Notes = await Notes.find();
  res.status(200).json(Notes);
});

app.get('/notes/:noteId', (req, res) => {
  res
    .status(200)
    .json({ message: `Retrieved note with ID: ${req.params.noteId}` });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

// error
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'повідомлення про помилку',
    error: err.message,
  });
});

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
