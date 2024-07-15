import React from 'react';
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

interface PropNoteButton {
  archive: () => void;
  unarchive?: () => void;
  trash:() => void;
  isArchivedPage?: boolean; 
}

const NoteButtons: React.FC<PropNoteButton> = ({ archive, trash,  unarchive = () => {},  isArchivedPage = false }) => {
  
  return (
    <div className="button-container-wrapper">
      <div className="button-container">
        
          <Button style={{ padding: 5 }} color="link"><Tooltip title="Remind me">
            <AddAlertOutlinedIcon fontSize="small" /></Tooltip>
          </Button>
          <Button style={{ padding: 5 }} color="link"><Tooltip title="Collaborator">
            <PersonAddAltIcon fontSize="small" /></Tooltip>
          </Button>    
          <Button style={{ padding: 5 }} color="link"><Tooltip title="Background Options">
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
    </div>
  );
}

export default NoteButtons;