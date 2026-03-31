import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  // fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3001/notes')
    const data = await res.json()
    setNotes(data)

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
    setNote('')
    fetchNotes()
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
      <ul>
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

export default App