import {Request, Response} from 'express'

let notes: string[] = [];

export const getNotes = (req: Request, res: Response) =>{
    res.json(notes);
};

export const addNote = (req: Request, res: Response) => {
    const {note} = req.body;

    if(!note || !note.trim()){
        return res.status(400).json({error: "note cannot be empty"});
    }
    notes.push(note);
    res.json({success:"true"});
}