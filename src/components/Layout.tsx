import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./../styles/Dashboard.scss";

const Layout: React.FC = () => {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState("");
  const [layoutMode, setLayoutMode] = useState<"horizontal" | "vertical">(
    "vertical"
  );
  const [searchText, setSearchText] = useState("");

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const toggleLayoutMode = () => {
    setLayoutMode(layoutMode === "horizontal" ? "vertical" : "horizontal");
  };

  return (
    <div className="note-dashboard">
      <div className="App">
        <div className="main">
          <Header toggleSidebar={toggleMenubar} pageTitle={pageTitle} toggleLayoutMode={toggleLayoutMode} layoutMode={layoutMode} onSearch={setSearchText}/>
          <div className="containerr">
            <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
            <div className={`notes-container ${isMenuSidebar ? 'shifted' : ''}`} >
              <Outlet context={{ layoutMode, toggleLayoutMode, searchText }} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
