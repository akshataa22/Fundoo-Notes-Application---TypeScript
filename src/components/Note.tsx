import React from "react";
import "./../styles/Dashboard.scss";
import { Note as NoteType } from "./../services/NoteService"; 
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import { PushPinOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import NoteButtons from "./NoteButtons";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

interface NoteProps {
  note: NoteType;
  layoutMode: 'vertical' | 'horizontal';
  updateNote?: (id: number, updatedNote: NoteType) => void;
  archiveNote?: (noteId: number) => void;
  unarchiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
  colorNote?: (noteId: number, color: string) => void;
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
  setReminder,
  deleteReminder
}) => {
  const handleBlur = (field: "title" | "description", value: string) => {
    if (note.id !== undefined) {
      updateNote(note.id, { ...note, [field]: value });
    }
  };

  const handleArchiveClick = () => {
    if (note.id !== undefined) {
      archiveNote?.(note.id);
    }
  };

  const handleUnarchiveClick = () => {
    if (note.id !== undefined) {
      unarchiveNote?.(note.id);
    }
  };

  const handleTrashClick = () => {
    if (note.id !== undefined) {
      trashNote?.(note.id);
    }
  };

  const handleColorSelection = (color: string) => {
    if (note.id !== undefined) {
      colorNote?.(note.id, color);
    }
  };

  const renderReminder = () => {
    if (note.reminder && !isNaN(Date.parse(note.reminder))) {
      return (
        <div className="reminder-tab">
          <div id="dates">{new Date(note.reminder).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')}</div>
          <Button onClick={() => note.id !== undefined && deleteReminder(note.id)}>
            <CloseOutlinedIcon fontSize="small" />
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="note-card"
      style={{
        marginLeft: layoutMode === 'vertical' ? '0' : '203px',
        width: layoutMode === 'vertical' ? '240px' : '48%',
        marginRight: layoutMode === 'horizontal' ? '12px' : '20px'
      }}
    >
      <Card className="card">
        <CardBody className="note-card-body">
          <CardTitle
            className="card-title"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleBlur("title", e.currentTarget.innerText)}
          >
            <div className="title-space">
              {note.title}
              <div className="title-button-wrapper">
                <div className="title-button">
                  <Button style={{ padding: 5 }} color="link">
                    <Tooltip title="Pin note">
                      <PushPinOutlined fontSize="medium" className="pin-icon" />
                    </Tooltip>
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
