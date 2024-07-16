import React,{useState, useEffect, useRef} from 'react';
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Tooltip } from "@mui/material";
import { Button } from 'reactstrap';
import "./../styles/Dashboard.scss";
import ColorCard from './ColorCard';
import ReminderCard from './ReminderCard';

interface PropNoteButton {
  archive: () => void;
  unarchive?: () => void;
  trash:() => void;
  colorNote: (color: string) => void;
  noteId: number; 
  setReminder: (noteId: number,reminder: string) => void; 
  isArchivedPage?: boolean; 
}

const NoteButtons: React.FC<PropNoteButton> = ({ archive, trash,  unarchive = () => {},  isArchivedPage = false, colorNote, noteId,setReminder }) => {
  const [colorCardVisible, setColorCardVisible] = useState(false);
  const [reminderCardVisible, setReminderCardVisible] = useState(false);
  const colorButtonRef = useRef<HTMLDivElement>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const handleColorButtonClick = () => {
    setSelectedNoteId(noteId); // Set selectedNoteId to noteId when button is clicked
    setColorCardVisible(!colorCardVisible);
  };

  const handleReminderButtonClick = () => { // Add this function
    setReminderCardVisible(!reminderCardVisible);   
  };


  const handleClickOutside = (e: MouseEvent) => {
    if (colorButtonRef.current && !colorButtonRef.current.contains(e.target as Node)) {
      setColorCardVisible(false);
    }
  };

  const handleColorSelection = (color: string) => {
    if (selectedNoteId !== null) {
      colorNote(color); // Call colorNote function with color parameter
      setSelectedNoteId(null); // Clear selectedNoteId after selection
    }
    setColorCardVisible(false); // Hide color card after selection
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="button-container-wrapper">
      <div className="button-container">
          <Button style={{ padding: 5 }} color="link" onClick={handleReminderButtonClick}><Tooltip title="Remind me">
            <AddAlertOutlinedIcon fontSize="small" /></Tooltip>
          </Button>
          <Button style={{ padding: 5 }} color="link"><Tooltip title="Collaborator">
            <PersonAddAltIcon fontSize="small" /></Tooltip>
          </Button>    
          <Button style={{ padding: 5 }} color="link" onClick={handleColorButtonClick}><Tooltip title="Background Options">
            <PaletteOutlinedIcon fontSize="small" /></Tooltip>
          </Button>                
          <Button style={{ padding: 5 }} color="link"><Tooltip title="Image Upload">
            <ImageOutlinedIcon fontSize="small" /></Tooltip>
          </Button>      
          {isArchivedPage ? (
          <Button style={{ padding: 5 }} color="link" onClick={unarchive}><Tooltip title="Unarchive">
          <UnarchiveOutlinedIcon fontSize="small" /></Tooltip>
        </Button>
        ) : (
          <Button style={{ padding: 5 }} color="link" onClick={archive}><Tooltip title="Archive">
            <ArchiveOutlinedIcon fontSize="small" /></Tooltip>
          </Button>
        )}                
          <Button style={{ padding: 5 }} color="link" onClick={trash}><Tooltip title="Delete">
          <DeleteOutlineOutlined fontSize="small" /></Tooltip>
        </Button>
      </div>
      {colorCardVisible && <ColorCard handleColorSelection={handleColorSelection} />}
      {reminderCardVisible && <ReminderCard noteId={noteId} setReminder={setReminder} />} 
    </div>
  );
}

export default NoteButtons;
