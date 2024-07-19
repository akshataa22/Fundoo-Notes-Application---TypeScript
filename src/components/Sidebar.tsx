import React, { useState, useEffect } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./../styles/Sidebar.scss";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    isClosed: boolean;
    setPageTitle: (title: string) => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ isClosed , setPageTitle }) => {
    const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setPageTitle('Fundoo Notes');
        break;
      case '/Reminder':
        setPageTitle('Reminder');
        break;
      case '/label':
        setPageTitle('Edit Label');
        break;
      case '/archived':
        setPageTitle('Archive');
        break;
      case '/trashed':
        setPageTitle('Bin');
        break;
      default:
        setPageTitle('Fundoo Notes');
    }
  }, [location.pathname, setPageTitle]);

  const handleOptionClick = (title: string) => {
    setPageTitle(title);
  };

    return (
        <div className={`mediasidebar ${isClosed ? 'collapsed' : ''}`}>
        <div className="sidebar">
            <div className="sidebar-options">
        <div style={{color:"black"}} className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard" onClick={() => handleOptionClick('Fundoo Notes')}>
            <LightbulbOutlinedIcon fontSize="medium" className="option-icon"  />
            {!isClosed && <>Notes</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/reminder" ? "active" : ""}>
          <Link to="/reminder" onClick={() => handleOptionClick('Reminder')}>
            <NotificationsNoneOutlinedIcon fontSize="medium" className="option-icon" />
            {!isClosed && <>Reminders</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/label" ? "active" : ""}>
          <Link to="" onClick={() => handleOptionClick('Edit Label')}>
          <EditOutlinedIcon fontSize="medium" className="option-icon" />
          {!isClosed && <>Edit Labels</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/archived" ? "active" : ""}>
          <Link to="/archived" onClick={() => handleOptionClick('Archive')}>
          <ArchiveOutlinedIcon fontSize="medium" className="option-icon"/>
          {!isClosed && <>Archive</>}
          </Link>
        </div>
        <div style={{color:"black"}} className={location.pathname === "/trashed" ? "active" : ""}>
          <Link to="/trashed" onClick={() => handleOptionClick('Bin')}>
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