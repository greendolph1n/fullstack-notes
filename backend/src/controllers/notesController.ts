import {Request, Response} from 'express'
import {pool} from '../db.js'
import {Note} from '../../../shared/types/note.js'

type UpdateNoteBody = {
    content: string;
};

export const getNotes = async (req: Request, res: Response) =>{
    const result = await pool.query('SELECT * FROM notes');
    res.json(result.rows);
};

export const addNote = async (req: Request, res: Response) => {
    const {note} = req.body;
    console.log("post hit");

    if(!note || !note.trim()){
        return res.status(400).json({error: "note cannot be empty"});
    }

    try {
        const result = await pool.query(
            'INSERT INTO notes (content) VALUES ($1) RETURNING id, content',
            [note]
        );
        const createdNote: Note = result.rows[0];
        console.log("added", note);
        return res.status(201).json(createdNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'failed to add note, check DB connection'});
    }

}

export const updateNote = async (
    req: Request<{id: string}, {}, UpdateNoteBody>,
    res: Response
)=> {
    console.log('UPDATE HIT', req.params.id, req.body);
    const id = Number(req.params.id);
    const {content} = req.body;

    if (!content || !content.trim()){
        return res.status(400).json({error:'Content cannot be empty'});
    }

    try {
        const result = await pool.query(
            'UPDATE notes SET content = $1 WHERE id = $2 RETURNING id, content;', [content, id]
        );
        if (result.rowCount === 0){
            return res.status(400).json({error:'note not found'});
        }
        const updatedNote: Note = result.rows[0];
        return res.json(updatedNote);
    } catch (err){
        console.error(err);
        return res.status(500).json({error:'failed to update note'});
    }
};

export const deleteNote = async (
    req: Request<{id: string}>,
    res: Response
) => {
    console.log("delete hit")
    const id = Number(req.params.id);
    try {
        const result = await pool.query(
            'DELETE from notes WHERE id = $1 RETURNING id;', [id]
        )
        if (result.rowCount === 0){
            return res.status(404).json({error:'id not found'});
        }
        res.json(result.rows[0])
    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'failed to delete note'});
    }
};