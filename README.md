# 📝 Fullstack Notes App

A minimal full-stack notes application built with:

- **Frontend:** React + TypeScript + Vite  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** PostgreSQL  

---
Database setup
```
brew services start postgresql
```
Create database
```
psql postgres
```
```
CREATE DATABASE notesapp;
\c notesapp

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL
);
```

Backend setup
```
cd backend
npm install
npm run dev
```

Frontend setup
```
cd frontend-vite
npm install
npm run dev
```

Test endpoints (example):
```
curl -X PUT http://localhost:3001/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"content":"updated via curl"}'
```
