import React, { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./../styles/Sidebar.scss";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    isClosed: boolean;
  }

const Sidebar: React.FC<SidebarProps> = ({ isClosed }) => {
    const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove("modal-open");
  };

    return (
        <div className={`mediasidebar ${isClosed ? 'collapsed' : ''}`}>
        <div className="sidebar">
            <div className="sidebar-options">
        <div style={{color:"black"}} className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <LightbulbOutlinedIcon fontSize="medium" className="option-icon"  />
            {!isClosed && <>Notes</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/Reminder" ? "active" : ""}>
          <Link to="/Reminder">
            <NotificationsNoneOutlinedIcon fontSize="medium" className="option-icon" />
            {!isClosed && <>Reminders</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/label" ? "active" : ""}>
          <Link to="" onClick={openModal}>
          <EditOutlinedIcon fontSize="medium" className="option-icon" />
          {!isClosed && <>Edit Labels</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/Archive" ? "active" : ""}>
          <Link to="/Archive">
          <ArchiveOutlinedIcon fontSize="medium" className="option-icon"/>
          {!isClosed && <>Archive</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/Trash" ? "active" : ""}>
          <Link to="/Trash">
            <DeleteOutlineOutlinedIcon fontSize="medium" className="option-icon" />
            {!isClosed && <>Bin</>}
          </Link>
        </div>
      </div>
    </div>
    </div>
    )
}

export default Sidebar;