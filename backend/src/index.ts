import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.js';
import './db';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

app.listen(3001, () => {
  console.log('listening on port 3001');
});
