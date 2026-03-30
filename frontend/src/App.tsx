import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])

  // fetch all notes
  const fetchNotes = async () => {
    const res = await fetch('http://localhost:3001/notes')
    const data = await res.json()
    setNotes(data)
  }

  // add a new note
  const addNote = async () => {
    if (!note.trim()) return

    await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note })
    })

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

      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter a note"
      />

      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

export default App