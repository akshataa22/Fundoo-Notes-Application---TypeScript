import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from './Header';
import Sidebar from "./Sidebar";
import Note from './Note';
import AddNote from './AddNote';
import NoteService, { Note as NoteType } from "./../services/NoteService";

const Dashboard: React.FC = () => {
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
    try {
      const response = await NoteService.fetchNotes(token);
      console.log("Fetched notes data:", response);
      const data: NoteType[] = Array.isArray(response.data.data) ? response.data.data : [];
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (newNote.title.trim() !== "" || newNote.description.trim() !== "") {
      try {
        console.log("added")
        await NoteService.addNote({ ...newNote }, token);
        fetchNotes(); 
        setNewNote({ title: "", description: "" }); 
      } catch (error) {
        console.error("Error adding note:", error); 
      }
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
          <div className="header-card">
            {notes.map((note) => (
              <Note key={note.id} notes={note} />
            ))}
          </div>  
          </div>
        </div>
      </div>    
    </div>
  );
};

export default Dashboard;
