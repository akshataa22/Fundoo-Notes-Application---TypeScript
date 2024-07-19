import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import NoteServices, { Note as NoteType } from "./../services/NoteService";
import archivebgicon from "./../assets/icons/archivebg-icon.svg";
import Note from "./Note";
import "./../styles/Dashboard.scss";
import "./../styles/Archived.scss";

function Archived() {
  const [archivedNotes, setArchivedNotes] = useState<NoteType[]>([]);
  const token = localStorage.getItem("token") || "";
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const { layoutMode, toggleLayoutMode, searchText } = useOutletContext<{
    layoutMode: "vertical" | "horizontal";
    toggleLayoutMode: () => void;
    searchText: string;
  }>();

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const filteredNotes = archivedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase())
  );

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
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log("Note is Unarchived");
    } catch (error) {
      console.error("Error Unarchiving note:", error);
    }
  };

  const handleTrash = async (noteId: number) => {
    try {
      await NoteServices.setNoteToTrash([noteId], token);
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log("Note is deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleColorChange = async (noteId: number, color: string) => {
    try {
      await NoteServices.setColor([noteId], token, color);
      setArchivedNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, color } : note
        )
      );
      console.log("Color updated successfully");
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const setReminder = async (noteId: number, reminder: string) => {
    try {
      await NoteServices.setReminder([noteId], token, reminder);
      fetchArchivedNotes();
      console.log("Reminder set successfully");
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  const removeReminder = async (noteId: number) => {
    try {
      await NoteServices.removeReminder([noteId], token);
      fetchArchivedNotes();
      console.log("Reminder removed successfully");
    } catch (error) {
      console.error("Error removing reminder:", error);
    }
  };

  return (
        <div className="archived-notes-container">
          <div className="header-card">
            {filteredNotes.length === 0 ? (
              <div className="bgImage">
                <img src={archivebgicon} alt="background image" />
                <p className="text">Your archived notes appear here</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  layoutMode={layoutMode}
                  colorNote={handleColorChange}
                  unarchiveNote={handleUnArchive}
                  isArchivedPage={true}
                  trashNote={handleTrash}
                  setReminder={setReminder}
                  deleteReminder={removeReminder}
                />
              ))
            )}
          </div>
        
      </div>
  );
}
export default Archived;
