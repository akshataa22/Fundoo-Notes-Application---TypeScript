import { useState, ChangeEvent, ChangeEventHandler, useRef,
  useEffect } from "react";
import {
  AddAlertOutlined as AddAlertIcon,
  PaletteOutlined as PaletteIcon,
  ImageOutlined as ImageIcon,
  ArchiveOutlined as ArchiveIcon,
  PersonAddAlt as PersonAddIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"; 
import { Input } from "reactstrap";
import "./../styles/AddNote.scss";
import NoteService, { Note as NoteType } from "./../services/NoteService";

interface AddNoteProps {
  newNotes: NoteType;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddNote: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({newNotes, onTitleChange, onTextChange, onAddNote}) => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  const addNoteRef = useRef<HTMLDivElement>(null);

  const toggleAddNote = () => {
    setIsAddNoteOpen(!isAddNoteOpen);
  };
  const toggleCloseAddNote = () => {
    setIsAddNoteOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      addNoteRef.current &&
      !addNoteRef.current.contains(event.target as Node)
    ) {
      setIsAddNoteOpen(false);
    }
  };

  const handleCloseAddNote = () => {
    if (newNotes.title || newNotes.description) {
      onAddNote();
    }
    setIsAddNoteOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });


  return (
    <div ref={addNoteRef} className="add-note">
      {isAddNoteOpen ? (
        <>
          <Input
              type="text"
              placeholder="Title"
              value={newNotes.title}
              onChange={onTitleChange}
              autoFocus
          />
          <textarea
              placeholder="Take a note..."
              value={newNotes.description}
              onChange={onTextChange}
          />
        <div className="AddNotebutton-container-wrapper">
            <div className="AddNotebutton-container">
              <button title="Remind me">
                <AddAlertIcon color="primary" fontSize="small" />
              </button>
              <button title="Collaborator">
                <PersonAddIcon fontSize="small" />
              </button>
              <button title="Background Options">
                <PaletteIcon fontSize="small" />
              </button>
              <button title="Image Upload">
                <ImageIcon fontSize="small" />
              </button>
              <button title="Archive">
                <ArchiveIcon fontSize="small" />
              </button>
              <button title="More Options">
                <MoreVertIcon fontSize="small" />
              </button>
            </div>
            <button title="Close" className="closeIcon" onClick={handleCloseAddNote}>
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