import type { Note } from '@shared/types/note';
import { useState, useEffect } from 'react'

interface Props {
    note: Note;
    onUpdate: (id: number, content: string) => void;
};

export default function NoteItem({note, onUpdate}: Props){
    const [editContent, setEditContent] = useState(note.content);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEditContent(note.content)
    }, [note.content]);

    return(
        <li>
            {!isEditing && note.content}
            {isEditing &&<input placeholder="Edit note" value={editContent} onChange={(e) => setEditContent(e.target.value)}/>}
            <button type="button" onClick = {() => {
                if (!isEditing){
                    setIsEditing(true);
                }else{
                    if (!editContent.trim()) return;
                    if (editContent === note.content) {
                        setIsEditing(false);
                        return;
                    }
                    onUpdate(note.id, editContent.trim());
                    setIsEditing(false);
                }
            }}>{isEditing? 'Save': 'Edit'}</button>    
            {isEditing && (
                <button onClick={()=> setIsEditing(false)}>Cancel</button>
            )}        
        </li>
    )
}