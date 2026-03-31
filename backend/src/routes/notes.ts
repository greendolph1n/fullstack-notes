import {Router} from 'express'
import {getNotes, addNote} from '../controllers/notesController'

const router = Router();

router.get('/', getNotes);
router.post('/', addNote);

export default router;