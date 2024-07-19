import { useState, ChangeEvent, useEffect, useRef } from "react";
import {
  AddAlertOutlined as AddAlertIcon,
  PaletteOutlined as PaletteIcon,
  ImageOutlined as ImageIcon,
  ArchiveOutlined as ArchiveIcon,
  PersonAddAlt as PersonAddIcon,
  DeleteOutlined as Deleteicon,
} from "@mui/icons-material";
import { Input } from "reactstrap";
import "./../styles/AddNote.scss";
import NoteService, { Note as NoteType } from "./../services/NoteService";
import ColorCard from "./ColorCard";

interface AddNoteProps {
  newNote: NoteType;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddNote: (note: NoteType) => void;
  colorNote?: (noteId: number, color: string) => void;
  archiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
}

const AddNote: React.FC<AddNoteProps> = ({
  newNote,
  onTitleChange,
  onTextChange,
  onAddNote,

}) => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [colorCardVisible, setColorCardVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF"); // Default white color
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const addNoteRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLDivElement>(null);

  const handleColorButtonClick = () => {
    setColorCardVisible(!colorCardVisible);
  };

  const handleColorSelection = (color: string) => {
    console.log("color selected");
    setSelectedColor(color);
    setColorCardVisible(false);
  };

  const handleAddNote = () => {
    const noteWithColor = { ...newNote, color: selectedColor };
    onAddNote(noteWithColor);
    setSelectedColor("#FFFFFF"); // Reset to default color after adding the note
  };

  const toggleAddNote = () => {
    setIsAddNoteOpen(!isAddNoteOpen);
  };

  const toggleCloseAddNote = () => {
    if (newNote.title || newNote.description) {
      handleAddNote();
    }
    setIsAddNoteOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      addNoteRef.current &&
      !addNoteRef.current.contains(event.target as Node)
    ) {
      setIsAddNoteOpen(false);
    }
    if (
      colorButtonRef.current &&
      !colorButtonRef.current.contains(event.target as Node)
    ) {
      setColorCardVisible(false);
    }
  };

  const handleCloseAddNote = () => {
    if (newNote.title || newNote.description) {
      handleAddNote();
    }
    setIsAddNoteOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={addNoteRef} className="add-note" style={{ backgroundColor: selectedColor }}>
      {isAddNoteOpen ? (
        <>
          <Input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={onTitleChange}
            autoFocus
            style={{ backgroundColor: selectedColor }}
          />
          <textarea
            placeholder="Take a note..."
            value={newNote.description}
            onChange={onTextChange}
            style={{ backgroundColor: selectedColor }}
          />
          <div className="AddNotebutton-container-wrapper">
            <div className="AddNotebutton-container">
              <button title="Remind me">
                <AddAlertIcon color="primary" fontSize="small" />
              </button>
              <button title="Collaborator">
                <PersonAddIcon fontSize="small" />
              </button>

              <div ref={colorButtonRef} className="color-button-container">
                <button title="Background Options" onClick={handleColorButtonClick}>
                  <PaletteIcon fontSize="small" />
                </button>
                {colorCardVisible && (
                  <ColorCard handleColorSelection={handleColorSelection} />
                )}
              </div>

              <button title="Image Upload">
                <ImageIcon fontSize="small" />
              </button>
              <button title="Archive">
                <ArchiveIcon fontSize="small" />
              </button>
              <button title="Delete">
                <Deleteicon fontSize="small" />
              </button>
            </div>
            
            
            <button
              title="Close"
              className="closeIcon"
              onClick={handleCloseAddNote}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <div className="take-note" onClick={toggleAddNote}>
          Take a note...
        </div>
      )}
    </div>
  );
};

export default AddNote;
