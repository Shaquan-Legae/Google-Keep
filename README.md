# Google Keep Clone — React

A fully functional Google Keep clone built with React and Vite. Designed to closely replicate the original Google Keep UI and feature set, including note management, sidebar navigation, search, dark mode, and reminders.

---

## Features

### Core
- Create notes with title and body
- Edit notes via modal
- Delete notes (moves to Trash)
- Archive and unarchive notes
- Masonry-style grid layout
- Responsive design

### Navigation
- Collapsible sidebar
- Notes / Archive / Trash views
- Dynamic view-based UI

### State & Storage
- Context API + useReducer
- LocalStorage persistence
- Modular hook-based logic

---

## Tech Stack

- React 18 (Vite)
- Context API
- useReducer
- CSS (custom)
- Material Icons
- UUID

---

## Project Structure

src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── Notes/
│   │   ├── CreateNote.jsx
│   │   ├── EditModal.jsx
│   │   ├── NoteCard.jsx
│   │   └── NotesGrid.jsx
│   │
│   ├── ui/
│   │   ├── ColorPicker.jsx
│   │   └── IconButton.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│   ├── useNotes.js
│   └── useOutsideClick.js
│
├── pages/
│   ├── Home.jsx
│   ├── Archive.jsx
│   └── Trash.jsx
│
├── state/
│   ├── NotesContext.jsx
│   └── notesReducer.js
│
├── styles/
│   └── global.css
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── assets/
│   ├── icons/
│   │   └── CheckIcon.jsx
│   └── images/
│       ├── favicon.svg
│       └── google-keep-logo.png
│
├── App.jsx
└── main.jsx

---

## Getting Started

npm install
npm run dev

---

## Build

npm run build
npm run preview

---

## Author

Shaquan
