import React from "react";
import "./../styles/Dashboard.scss";
import { Note as NoteType } from "./../services/NoteService"; 
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import { PushPinOutlined, PushPin } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import NoteButtons from "./NoteButtons";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface NoteProps {
  note: NoteType;
  layoutMode: 'vertical' | 'horizontal';
  updateNote?: (id: number, updatedNote: NoteType) => void;
  archiveNote?: (noteId: number) => void;
  unarchiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
  colorNote?: (noteId: number, color: string) => void;
  pinNote?: (noteId: number) => void;
  unPinNote?: (noteId: number) => void;
  isArchivedPage?: boolean;
  reminder?: string;
  setReminder: (noteId: number, reminder: string) => void; 
  deleteReminder: (noteId: number) => void;
}

const Note: React.FC<NoteProps> = ({
  note,
  layoutMode,
  updateNote = () => {},
  archiveNote = () => {},
  unarchiveNote = () => {},
  trashNote = () => {},
  isArchivedPage = false,
  colorNote = () => {},
  pinNote = () => {},
  unPinNote = () => {},
  setReminder,
  deleteReminder
}) => {
  
  const handleBlur = (field: "title" | "description", value: string) => {
    if (note.id !== undefined) {
      updateNote(note.id, { ...note, [field]: value });
    }
    console.log(layoutMode);
          
  };

  const handleArchiveClick = () => note.id !== undefined && archiveNote?.(note.id);

  const handleUnarchiveClick = () => note.id !== undefined && unarchiveNote?.(note.id);

  const handleTrashClick = () => note.id !== undefined && trashNote?.(note.id);

  const handleColorSelection = (color: string) => note.id !== undefined && colorNote?.(note.id, color);

  const handlePinClick = () => note.id !== undefined && (note.isPined ? unPinNote?.(note.id) : pinNote?.(note.id));

  const renderReminder = () => {
    if (note.reminder && !isNaN(Date.parse(note.reminder))) {
      return (
        <div className="reminder-tab">
          <div id="dates">
            {new Date(note.reminder).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(',', '')}
          </div>
          <Button onClick={() => note.id !== undefined && deleteReminder(note.id)}>
            <CloseOutlinedIcon fontSize="small" />
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`note-card ${layoutMode}`}>
      <Card className="card" style={{ backgroundColor: note.color }}>
        <CardBody className="note-card-body">
          <CardTitle
            className="card-title"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur("title", e.currentTarget.innerText)}
            aria-label="Note Title"
          >
            <div className="title-space">
              {note.title}
              <div className="title-button-wrapper">
                <div className="title-button">
                  <Button style={{ padding: 5 }} color="link" onClick={handlePinClick}>
                    {note.isPined ? (
                      <Tooltip title="Unpin note">
                        <PushPin fontSize="medium" className="pin-icon" />
                      </Tooltip>
                    ) : (
                      <Tooltip title={isArchivedPage ? "Pin Archived Note" : "Pin note"}>
                        <PushPinOutlined fontSize="medium" className="pin-icon" />
                      </Tooltip>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardTitle>
          <CardText
            className="card-text"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur("description", e.currentTarget.innerText)}
            aria-label="Note Description"
          >
            {note.description}
          </CardText>
          
          {renderReminder()}

          {note.id !== undefined && (
            <NoteButtons
              noteId={note.id}
              archive={handleArchiveClick}
              trash={handleTrashClick}
              unarchive={handleUnarchiveClick}
              isArchivedPage={isArchivedPage}
              colorNote={handleColorSelection}
              setReminder={setReminder} 
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Note;
