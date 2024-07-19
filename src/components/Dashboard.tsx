import { useState, ChangeEvent, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Note from "./Note";
import AddNote from "./AddNote";
import NoteService, { Note as NoteType } from "./../services/NoteService";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

function Dashboard() {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState({ title: "", description: "", color: "#FFFFFF" });
  const [pageTitle, setPageTitle] = useState("");
  const token = localStorage.getItem("token") || "";
  const { layoutMode, toggleLayoutMode, searchText } = useOutletContext<{
    layoutMode: "vertical" | "horizontal";
    toggleLayoutMode: () => void;
    searchText: string;
  }>();

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.isPined);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPined);

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleNoteTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const fetchNotes = async () => {
    const response = await NoteService.fetchNotes(token);
    const data: NoteType[] = Array.isArray(response.data.data)
      ? response.data.data
      : [];
    setNotes(data);
  };

  const addNote = async (note: NoteType) => {
    if (note.title.trim() !== "" || note.description.trim() !== "") {
      console.log("Adding note...");
      await NoteService.addNote(note, token);
      fetchNotes();
      setNewNote({ title: "", description: "", color: "#FFFFFF" });
    }
  };

  const updateNote = async (id: number, updatedNote: NoteType) => {
    try {
      await NoteService.updateNote(id, updatedNote, token);
      fetchNotes();
      console.log("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleArchive = async (noteId: number) => {
    try {
      await NoteService.setNoteToArchive([noteId], token);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId && !note.isArchived)
      );
      console.log("Note is archived");
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const handleTrash = async (noteId: number) => {
    try {
      await NoteService.setNoteToTrash([noteId], token);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log("Note is deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleColor = async (noteId: number, color: string) => {
    try {
      await NoteService.setColor([noteId], token, color);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, color: color } : note
        )
      );
      console.log("Note color applied");
    } catch (error) {
      console.error("Error color note:", error);
    }
  };

  const handlePin = async (noteId: number) => {
    try {
      await NoteService.pinNote([noteId], token);
      fetchNotes();
      console.log("Note is pinned");
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleUnPin = async (noteId: number) => {
    try {
      await NoteService.unPinNote([noteId], token);
      fetchNotes();
      console.log("Note is unpinned");
    } catch (error) {
      console.error("Error unpinning note:", error);
    }
  };

  const setReminder = async (noteId: number, reminder: string) => {
    try {
      await NoteService.setReminder([noteId], token, reminder);
      fetchNotes();
      console.log("Reminder set successfully");
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  const removeReminder = async (noteId: number) => {
    try {
      await NoteService.removeReminder([noteId], token);
      fetchNotes();
      console.log("Reminder removed successfully");
    } catch (error) {
      console.error("Error removing reminder:", error);
    }
  };

  return (
    <>
      <div className="add-note-container" style={{ display: searchText.trim() !== "" ? "none" : "block" }}>
        <AddNote
          newNote={newNote}
          onTitleChange={handleNoteTitleChange}
          onTextChange={handleNoteTextChange}
          onAddNote={addNote}
          colorNote={handleColor}
          archiveNote={handleArchive}
        />
      </div>
      {filteredNotes.length === 0 ? (
        <div className="bgImage">
          <LightbulbOutlinedIcon
            style={{ fontSize: 120 }}
            className="dashimg"
          />
          <p className="text">Notes you add appear here</p>
        </div>
      ) : (
        <>
          <div className="pinned-notes-container">
            {pinnedNotes.length > 0 && searchText.trim() === "" && (
              <h2
                className={`note-head-container ${layoutMode}`}
                
              >
                PINNED
              </h2>
            )}
            <>
              <div className="header-card">
                {pinnedNotes.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    layoutMode={layoutMode}
                    updateNote={updateNote}
                    archiveNote={handleArchive}
                    trashNote={handleTrash}
                    colorNote={handleColor}
                    pinNote={handlePin}
                    unPinNote={handleUnPin}
                    setReminder={setReminder}
                    deleteReminder={removeReminder}
                  />
                ))}
              </div>
            </>
          </div>
          <div className="unpinned-notes-container">
            {pinnedNotes.length > 0 && searchText.trim() === "" && (
              <h2
                className={`note-head-container ${layoutMode}`}
                
              >
                OTHERS
              </h2>
            )}
            <>
              <div className="header-card">
                {unpinnedNotes
                  .filter((note) => !note.isArchived && !note.isDeleted)
                  .map((note) => (
                    <Note
                      key={note.id}
                      note={note}
                      layoutMode={layoutMode}
                      updateNote={updateNote}
                      archiveNote={handleArchive}
                      trashNote={handleTrash}
                      colorNote={handleColor}
                      pinNote={handlePin}
                      unPinNote={handleUnPin}
                      setReminder={setReminder}
                      deleteReminder={removeReminder}
                    />
                  ))}
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
