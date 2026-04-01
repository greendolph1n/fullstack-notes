import {Request, Response} from 'express'
import {pool} from '../db.js'


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
        const createdNote = result.rows[0];
        console.log("added", note);
        return res.status(201).json(createdNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'failed to add note, check DB connection'});
    }

}