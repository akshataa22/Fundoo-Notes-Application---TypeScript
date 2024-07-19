import React, { useEffect, useState } from "react";
import logo from "./../assets/icons/logo.png";
import menu from "./../assets/icons/all icon.png";
import MenuIcon from "@mui/icons-material/Menu";
import { ViewStreamOutlined as ViewStreamOutlinedIcon } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { GridView as GridViewIcon } from "@mui/icons-material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../api/baseapi";
import "./../styles/Header.scss";

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
  toggleLayoutMode: () => void;
  layoutMode: "vertical" | "horizontal";
  onSearch: (searchText: string) => void;
}

function Header({
  toggleSidebar,
  pageTitle,
  toggleLayoutMode,
  layoutMode,
  onSearch,
}: HeaderProps) {
  const [showUserCard, setShowUserCard] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const toggleUserCard = () => {
    setShowUserCard(!showUserCard);
  };

  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      try {
        const response = await axios.post(
          `${base_url}/user/uploadProfileImage?access_token=${token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setProfilePicture(URL.createObjectURL(event.target.files[0]));
          console.log("Profile picture uploaded successfully");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${base_url}/user/logout?access_token=${token}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 204) {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        navigate("/");
        console.log("Logout successful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    setUsername(`${email}`);
  }, [email]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="space"></div>
      <div className="mainMenu">
        <button title="Main menu" onClick={toggleSidebar}>
          <i className="menu">
            <MenuIcon fontSize="medium" />
          </i>
        </button>
      </div>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
        <span className="logo-text">{pageTitle}</span>
      </div>
      <div className={`search-container ${showSearchInput ? 'active' : ''}`}>
        <SearchIcon className="search-icon" onClick={() => setShowSearchInput(true)} />
        <input type="text" placeholder="Search..." onChange={(e) => onSearch(e.target.value)} className={`search-input ${showSearchInput ? 'active' : ''}`} />
      </div>
            {/* <div className="closeicon">
              <CloseIcon />
            </div> */}
        <div className='spacer'></div>
        <div className="icons">
            <RefreshOutlinedIcon onClick={handleRefresh}/>
          <div className="layout-toggle" onClick={toggleLayoutMode}>
            {layoutMode === "vertical" ? (
              <ViewStreamOutlinedIcon fontSize="medium" />
            ) : (
              <GridViewIcon fontSize="medium" />
            )}
          </div>
          <SettingsOutlinedIcon className="setting" />
        </div>
      <div className="lastpartOfheader">
        <img className="squareIcon" src={menu} alt="menu" />
        <div className="user-circle" onClick={toggleUserCard}>
          {profilePicture ? (
            <>
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            </>
          ) : (
            <span>{firstInitial}</span>
          )}
        </div>
      </div>
        {showUserCard && (
          <div className="user-card">
            <div className="user-info">
              <p className="username">{username}</p>
            </div>
            <div className="profile-button-container">
              <label
                htmlFor="profile-picture-input"
                className="profile-picture-label"
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                ) : (
                  <span> {firstInitial} </span>
                )}
              </label>
              <input
                className="pic"
                type="file"
                accept="image/*"
                id="profile-picture-input"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            <p className="account">Hi, {firstName}!</p>

            <div className="account-actions">
              <button className="add-account-button">Add Account</button>
              <button className="sign-out-button" onClick={handleLogout}>
                <LogoutIcon style={{ marginRight: 5 }} />
                Logout
              </button>
            </div>
          </div>
        )}
    </header>
  );
}

export default Header;
