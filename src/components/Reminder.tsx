import React, { useState, useEffect } from "react";
import NoteService, { Note as NoteType } from "./../services/NoteService";
import reminderbgicon from './../assets/icons/reminderbg-icon.svg'
import Note from "./Note";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './../styles/Dashboard.scss'
import './../styles/Archived.scss'
import './../styles/Reminder.scss'
import base_url from "../api/baseapi";
import axios from "axios";

function Reminder() {
      const [reminderNotes, setReminderNotes] = useState<NoteType[]>([]);
      const token = localStorage.getItem("token") || "";
      const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
      const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical'); 
      const [pageTitle, setPageTitle] = useState('');

      const toggleLayoutMode = () => {
        setLayoutMode(prevMode => (prevMode === 'vertical' ? 'horizontal' : 'vertical'));
      };
    
      const toggleMenubar = () => {
        setSidebarMenu(!isMenuSidebar);
      };
    
      const fetchReminderNotes = async () => {
        try {
          const response = await axios.get(`${base_url}/notes/getReminderNotesList`, {
            headers: {
              Authorization: token,
            },
          });
          console.log("Fetched reminder notes data:", response.data.data.data);
          const data: NoteType[] = Array.isArray(response.data.data.data)
            ? response.data.data.data
            : [];
          setReminderNotes(data);
        } catch (error) {
          console.error("Error fetching reminder notes:", error);
        }
      };

      const handleUnArchive = async (noteId: number) => {
        try {
          await NoteService.setNoteToUnArchive([noteId], token);
          setReminderNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is Unarchived");
        } catch (error) {
          console.error('Error Unarchiving note:', error);
        }
      };

      const handleTrash = async (noteId: number) => {
        try {
          await NoteService.setNoteToTrash([noteId], token);
          setReminderNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is deleted");
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      };
    
      useEffect(() => {
        fetchReminderNotes();
      }, []);
    
      return (
        <div className="note-dashboard">
          <div className="App">
            <Header toggleSidebar={toggleMenubar}  layoutMode={layoutMode} toggleLayoutMode={toggleLayoutMode} pageTitle={pageTitle} />
            <div className="main">
              <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
              <div className="reminder-container">
              <div className="notes-container">
                <div className="reminder-notes-container">
                <div className='header-card' style={{marginTop:'33%'}}>
                  {reminderNotes.length === 0 ? (
                    <div className="bgImage">
                    <img src={reminderbgicon} alt="background image"/>
                    <p className="text">Your reminder notes appear here</p>
                  </div>
                  ) : (
                    reminderNotes.map((note) => (
                      <Note key={note.id} note={note} layoutMode={layoutMode} unarchiveNote={handleUnArchive} isArchivedPage={false} trashNote={handleTrash} />
                    ))
                  )}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      );
   
};

export default Reminder;