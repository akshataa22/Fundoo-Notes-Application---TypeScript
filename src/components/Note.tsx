import NoteButtons from "./NoteButtons";
import React,{useState} from "react";
import "./../styles/Dashboard.scss";
import { Note as NoteType } from "./../services/NoteService"; 
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

interface NoteProps {
  notes: NoteType;

}

const Note: React.FC<NoteProps> = ({ notes }) => {
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical'); 

  const toggleLayoutMode = () => {
    setLayoutMode(prevMode => (prevMode === 'vertical' ? 'horizontal' : 'vertical'));
  };

  return (      
    <div className="note-card" style={{ marginLeft: layoutMode === 'vertical' ? '0' : '272px',  width: layoutMode === 'vertical' ? '240px' : '51.4%', marginRight: layoutMode === 'horizontal' ? '12px' : '20px' }}>
      <Card className="card">
        <CardBody className="note-card-body">
          <CardTitle className="card-title">{notes.title}</CardTitle>
          <CardText className="card-text">{notes.description}</CardText>
          <NoteButtons/>
        </CardBody>
      </Card>
    </div>
  )    
}

export default Note;