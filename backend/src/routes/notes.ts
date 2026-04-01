import { Router } from 'express';
import { getNotes, addNote, updateNote } from '../controllers/notesController';

const router = Router();

router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', updateNote);

export default router;
