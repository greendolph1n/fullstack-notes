import './App.css';
import { useState, useEffect } from 'react'
import type { Note } from '@shared/types/note';
import NoteItem from './components/NoteItem';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [editContent, setEditContent] = useState('');

  // fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3001/notes');
    const data = await res.json();
    setNotes(data);
    console.log(data);

    setLoading(false);
  }

  // add a new note
  const addNote = async () => {
    //if (!note.trim()) return

    const res= await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note })
    })
    const data = await res.json();
    if (!res.ok){
      setError(data.error);
      return;
    }    
    setError(null);
    setNote('');

    setNotes((prev) => [...prev, data]);
  }

  const updateNote = async (id: number, content: string) => {
    const res = await fetch(`http://localhost:3001/notes/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({content: content.trim()})
    });

    if (!res.ok){
      const data = await res.json();
      setError(data.error)
      return;
    }
    const data: Note = await res.json();
    setError(null);
    setNotes((prev) => prev.map((note)=>{
      if (note.id === data.id) return data;
      return note;
    }));
  }

  const deleteNote = async (id: number) => {
    console.log("DELETE CLICKED")
    const res = await fetch (`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
    });

    if(!res.ok){
      const data = await res.json();
      setError(data.error);
      return;
    }
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setError(null);
  }

  // run once on load
  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Notes</h1>
      {error && (
        <div style= {{
          padding:10,
          background: "#ffe6e6",
          color: "#a00"
        }}>
          {error}
        </div>
      )}

      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter a note"
      />

      <button onClick={addNote}>Add</button>

      {loading && <p>Loading...</p>}
        <ul style={{ listStylePosition: 'inside', textAlign: 'center' }}>
          {notes.map((n) => (
            <NoteItem key={n.id} note={n} onUpdate={updateNote} onDelete = {deleteNote}/>
          ))}
        </ul>
    </div>
  )
}

export default App