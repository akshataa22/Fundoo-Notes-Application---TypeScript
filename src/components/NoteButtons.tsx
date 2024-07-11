import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./../styles/Dashboard.scss";

const NoteButtons=()=>{

    return(
    <div className="button-container-wrapper">
        <div className="button-container">
          <button title="Remind me">
            <AddAlertOutlinedIcon
              color="primary"
              fontSize="small"
            />
          </button>
          <button title="Collaborator">
            <PersonAddAltIcon fontSize="small" />
          </button>
          <button title="Background Options">
            <PaletteOutlinedIcon fontSize="small" />
          </button>
          <button title="Image Upload">
            <ImageOutlinedIcon fontSize="small" />
          </button>
          <button title="Archive">
            <ArchiveOutlinedIcon fontSize="small" />
          </button>
          <button title="More Options">
            <MoreVertIcon fontSize="small" />
          </button>
        </div>
      </div>)
}
export default NoteButtons;