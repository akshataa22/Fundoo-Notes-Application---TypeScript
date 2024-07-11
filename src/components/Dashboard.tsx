import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from './Header';
import Sidebar from "./Sidebar";
import Note from './Note';
import AddNote from './AddNote';
import NoteService, { Note as NoteType } from "./../services/NoteService";

function Dashboard() {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleNoteTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const fetchNotes = async () => {
    const response = await NoteService.fetchNotes(token);
    console.log("Fetched notes data:", response);
    const data: NoteType[] = Array.isArray(response.data.data) ? response.data.data : [];
    setNotes(data);
  };

  const addNote = async () => {
    if (newNote.title.trim() !== "" || newNote.description.trim() !== "") {
      console.log("Adding note...");
      await NoteService.addNote({ ...newNote }, token);
      fetchNotes();
      setNewNote({ title: "", description: "" });
    }
  };

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  return (
    <div>
      <Header toggleSidebar={toggleMenubar} />
      <div className='main'>
        <Sidebar isClosed={isMenuSidebar} />
        <div className="notes-container">
          <AddNote newNotes={newNote} onTitleChange={handleNoteTitleChange} onTextChange={handleNoteTextChange} onAddNote={addNote} />
          <div className="pinned-notes-container">
            <div className='header-card'>
              {notes.map((note) => (
                <Note key={note.id} notes={note} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;