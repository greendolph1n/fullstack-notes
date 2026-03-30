import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let notes: string[] = [];

app.get("/notes", (req,res) =>{
    console.log("get hit");
    res.json(notes);
});

app.post('/notes', (req,res) => {
    console.log("post hit");
    
    const{note} = req.body;
    notes.push(note);
    res.json({success: true});
});

app.listen(3001, ()=> {
    console.log("listening on port 3001");
});
