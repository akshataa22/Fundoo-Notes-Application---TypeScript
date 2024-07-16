import React, { useState, useEffect } from "react";
import NoteServices, { Note as NoteType } from "./../services/NoteService";
import archivebgicon from './../assets/icons/archivebg-icon.svg'
import Note from "./Note";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './../styles/Dashboard.scss'
import './../styles/Archived.scss'
import './../styles/Trashed.scss'

function Archive() {
      const [archivedNotes, setArchivedNotes] = useState<NoteType[]>([]);
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
    
      const fetchArchivedNotes = async () => {
        try {
          const response = await NoteServices.fetchArchiveNotes(token);
          console.log("Fetched archive notes data:", response);
          const data: NoteType[] = Array.isArray(response.data.data)
            ? response.data.data
            : [];
            setArchivedNotes(data);
        } catch (error) {
          console.error("Error fetching trash notes:", error);
        }
      };

      const handleUnArchive = async (noteId: number) => {
        try {
          await NoteServices.setNoteToUnArchive([noteId], token);
          setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is Unarchived");
        } catch (error) {
          console.error('Error Unarchiving note:', error);
        }
      };

      const handleTrash = async (noteId: number) => {
        try {
          await NoteServices.setNoteToTrash([noteId], token);
          setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is deleted");
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      };

      const setReminder = async (noteId: number, reminder: string) => {
        try {
          await NoteServices.setReminder([noteId], token, reminder);
          fetchArchivedNotes();
          console.log('Reminder set successfully');
        } catch (error) {
          console.error('Error setting reminder:', error);
        }
      };

      const removeReminder = async (noteId: number) => {
        try {
          await NoteServices.removeReminder([noteId], token);
          fetchArchivedNotes();
          console.log('Reminder removed successfully');
        } catch (error) {
          console.error('Error removing reminder:', error);
        }
      };
    
      useEffect(() => {
        fetchArchivedNotes();
      }, []);
    
      return (
        <div className="note-dashboard">
          <div className="App">
            <Header toggleSidebar={toggleMenubar}  layoutMode={layoutMode} toggleLayoutMode={toggleLayoutMode} pageTitle={pageTitle} />
            <div className="main">
              <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
              <div className="trash-container">
              <div className="notes-container">
                <div className="archived-notes-container">
                <div className='header-card'>
                  {archivedNotes.length === 0 ? (
                    <div className="bgImage">
                    <img src={archivebgicon} alt="background image"/>
                    <p className="text">Your archived notes appear here</p>
                  </div>
                  ) : (
                    archivedNotes.map((note) => (
                      <Note key={note.id} note={note} layoutMode={layoutMode} unarchiveNote={handleUnArchive} isArchivedPage={true} trashNote={handleTrash} setReminder={setReminder} deleteReminder={removeReminder}/>
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
export default Archive;