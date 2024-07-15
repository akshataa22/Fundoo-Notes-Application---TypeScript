import React, { useState } from "react";
import "./../styles/Dashboard.scss";
import { Note as NoteType } from "./../services/NoteService"; 
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import { PushPinOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import NoteButtons from "./NoteButtons";

interface NoteProps {
  note: NoteType;
  layoutMode: 'vertical' | 'horizontal';
  updateNote?: (id: number, updatedNote: NoteType) => void;
  archiveNote?: (noteId: number) => void;
  unarchiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
  isArchivedPage?: boolean;
}

const Note: React.FC<NoteProps> = ({ note, layoutMode, updateNote = () => {}, archiveNote = () => {}, unarchiveNote = () => {}, trashNote = () => {} ,isArchivedPage = false }) => {
  const handleBlur = (field: "title" | "description", value: string) => {
    if (note.id !== undefined) {
      updateNote(note.id, { ...note, [field]: value });
    }
  };

  const handleArchiveClick = () => {
    if (note.id !== undefined) {
      archiveNote(note.id);
    }
  };

  const handleUnarchiveClick = () => {
    if (note.id !== undefined) {
      unarchiveNote(note.id);
    }
  };

  const handleTrashClick = () => {
    if (note.id !== undefined) {
      trashNote(note.id);
    }
  };

  return (      
    <div className="note-card" style={{ marginLeft: layoutMode === 'vertical' ? '0' : '203px',  width: layoutMode === 'vertical' ? '240px' : '48%', marginRight: layoutMode === 'horizontal' ? '12px' : '20px' }}>
      <Card className="card">
        <CardBody className="note-card-body" contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur("title", e.currentTarget.innerText)}>
          <CardTitle className="card-title" >
            <div className="title-space">{note.title}
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
          <CardText className="card-text" contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur("description", e.currentTarget.innerText)}>{note.description}</CardText>
          <NoteButtons archive={handleArchiveClick} trash={handleTrashClick} unarchive={handleUnarchiveClick} isArchivedPage={isArchivedPage}/>
        </CardBody>
      </Card>
    </div>
  )    
}

export default Note;
