import React, { useState, useEffect } from "react";
import NoteService, { Note as NoteType } from "./../services/NoteService";
import { Button } from 'reactstrap';
import Header from "./Header";
import Sidebar from "./Sidebar";
import './../styles/Dashboard.scss';
import './../styles/Trashed.scss';
import trashbgicon from './../assets/icons/trashbg-icon.svg';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip } from "@mui/material";

function Trashed() {
  const [trashedNotes, setTrashedNotes] = useState<NoteType[]>([]);
  const token = localStorage.getItem("token") || "";
  const [pageTitle, setPageTitle] = useState('');
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical'); 
  const [searchText, setSearchText] = useState('');

  const filteredNotes = trashedNotes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.description.toLowerCase().includes(searchText.toLowerCase())
  );


  const toggleLayoutMode = () => {
    setLayoutMode(prevMode => (prevMode === 'vertical' ? 'horizontal' : 'vertical'));
  };

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const fetchTrashNotes = async () => {
    try {
      const response = await NoteService.fetchTrashNotes(token);
      console.log("Fetched trash notes data:", response);
      const data: NoteType[] = Array.isArray(response.data.data) ? response.data.data : [];
      setTrashedNotes(data);
    } catch (error) {
      console.error("Error fetching trash notes:", error);
    }
  };

  const handleUnTrash = async (noteId: number) => {
    try {
      await NoteService.setNoteToUnTrash([noteId], token);
      setTrashedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log("Note is untrash");
    } catch (error) {
      console.error("Error untrashing note:", error);
    }
  };

  const deleteForever = async (noteId: number) => {
    try {
      await NoteService.deleteNoteForever([noteId], token);
      setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      console.log("Note is permantaly deleted");
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    fetchTrashNotes();
  }, []);

  return (
    <div className="App">
      <Header toggleSidebar={toggleMenubar} layoutMode={layoutMode} toggleLayoutMode={toggleLayoutMode} pageTitle={pageTitle} onSearch={setSearchText}/>
      <div className="main">
        <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
        <div className="trash-container">
          <div className="notes-container">
            <div className="trashed-notes-container">
              {trashedNotes.length === 0 ? (
                <div className="BackImg">
                  <img src={trashbgicon} alt="background image"/>
                  <p className="noNote">No notes in Recycle Bin</p>
                </div>
              ) : (
                <div className="header-card">
                  {filteredNotes.map((note) => (
                    <div className="note-card" key={note.id} style={{ marginLeft: layoutMode === 'vertical' ? '0' : '203px', width: layoutMode === 'vertical' ? '240px' : '48%', marginRight: layoutMode === 'horizontal' ? '12px' : '20px' }}>
                      <div className="card" style={{backgroundColor:note.color}}>
                        <div className="note-card-body" style={{textAlign: "start"}}>
                          <div className="card-title">{note.title}</div>
                          <div className="card-text">{note.description}</div>
                          <div className="button-container-wrapper">
                            <div className="button-container" style={{justifyContent:"normal"}}>
                              <Button title="deleteForever" onClick={() => deleteForever(note.id!)}><Tooltip title="Delete Forever">
                                <DeleteForeverIcon fontSize="small" /></Tooltip>
                              </Button>
                              <Button title="UnTrash" onClick={() => handleUnTrash(note.id!)}><Tooltip title="Restore">
                                <RestoreFromTrashIcon fontSize="small" /></Tooltip>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trashed;
