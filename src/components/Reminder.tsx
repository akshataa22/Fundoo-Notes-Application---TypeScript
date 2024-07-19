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
import 'react-toastify/dist/ReactToastify.css';

function Reminder() {
      const [reminderNotes, setReminderNotes] = useState<NoteType[]>([]);
      const token = localStorage.getItem("token") || "";
      const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
      const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical'); 
      const [pageTitle, setPageTitle] = useState('');
      const [searchText, setSearchText] = useState('');

      const filteredNotes = reminderNotes.filter(note =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description.toLowerCase().includes(searchText.toLowerCase())
      );

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

      const handleArchive = async (noteId: number) => {
        try {
          await NoteService.setNoteToArchive([noteId], token);
          setReminderNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is Archived");
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
    
      const setReminder = async (noteId: number, reminder: string) => {
        try {
          await NoteService.setReminder([noteId], token, reminder);
          fetchReminderNotes();
          console.log('Reminder set successfully');
        } catch (error) {
          console.error('Error setting reminder:', error);
        }
      };

      const removeReminder = async (noteId: number) => {
        try {
          await NoteService.removeReminder([noteId], token);
          fetchReminderNotes();
          console.log('Reminder removed successfully');
        } catch (error) {
          console.error('Error removing reminder:', error);
        }
      };
      
      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        const filtered = reminderNotes.filter(note => 
          note.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setReminderNotes(filtered);
      };

      useEffect(() => {
        fetchReminderNotes();
      }, []);
    
      return (
          <div className="App">
            <Header toggleSidebar={toggleMenubar}  layoutMode={layoutMode} toggleLayoutMode={toggleLayoutMode} pageTitle={pageTitle} onSearch={setSearchText}/>
            <div className="main">
              <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
              <div className="reminder-container">
              <div className="notes-container">
                <div className="reminder-notes-container">
                <div className='header-card'>
                  {filteredNotes.length === 0 ? (
                    <div className="bgImage">
                    <img src={reminderbgicon} alt="background image"/>
                    <p className="text">Your reminder notes appear here</p>
                  </div>
                  ) : (
                    reminderNotes.map((note) => (
                      <Note key={note.id} note={note} layoutMode={layoutMode} archiveNote={handleArchive} isArchivedPage={false} trashNote={handleTrash} setReminder={setReminder} deleteReminder={removeReminder}/>
                    ))
                  )}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
      );
   
};

export default Reminder;