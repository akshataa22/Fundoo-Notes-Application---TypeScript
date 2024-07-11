import React, {useState} from 'react';
import logo from './../assets/icons/logo.png'
import allicon from './../assets/icons/all icon.png'
import { ViewStreamOutlined as ViewStreamOutlinedIcon } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { GridView as GridViewIcon } from '@mui/icons-material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import './../styles/Header.scss'

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const [showUserCard, setShowUserCard] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const toggleUserCard = () => {
        setShowUserCard(!showUserCard);
      };    

    const firstInitial = username ? username.charAt(0).toUpperCase() : '';
    
    const removeProfilePicture = () => {
        setProfilePicture(null);
        localStorage.removeItem('profilePicture');
      };
    

    return (
        <header>
            <div className='part1'>
                <div className='part1-1'>
                    <button className='menubar' onClick={toggleSidebar}><svg viewBox="0 0 60 48" width="20" height="16" xmlns="http://www.w3.org/2000/svg">
                        <rect width="60" height="8" rx="4" fill="#5f6368"></rect>
                        <rect y="20" width="60" height="8" rx="4" fill="#5f6368"></rect>
                        <rect y="40" width="60" height="8" rx="4" fill="#5f6368"></rect>
                    </svg></button>
                </div>
                <div className='logos'>
                    <img src={logo} alt="logo" id='logo' />
                    <span>Keep</span>
                </div>
            </div>
            <div className='part2'>
                <div className='part1-2'>
                    <form className='search-button' method='get' role='search'>
                        <button className='abovesearch' type='button'>
                            <svg className='colors' focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                                <path d="M0,0h24v24H0V0z" fill="none"></path>
                            </svg>
                        </button>
                        <div className="search-container">
                            <input type="text" placeholder="Search" className="search-input" />
                        </div>
                        <div className='searchicon'>
                        <button>
                            <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </button></div>
                    </form>
                </div>
                <div className='secondpart'>
                    <RefreshOutlinedIcon />
                    <div className="layout-toggle">
                    <GridViewIcon />
                    </div>
                    <SettingsOutlinedIcon />
                </div>
            </div>    
            <div className='part3'>
                <div>
                    <img className='menu' src={allicon} alt="menu" />
                </div>
                <div className="user-circle" onClick={toggleUserCard}>
        {profilePicture ? (
        <>
         <img src={profilePicture} alt="Profile" className="profile-picture" />
        </>
        ) : (firstInitial)}
      </div>
      {showUserCard && (
      <div className="user-card">
        <div className="user-info">
          <p>{username}</p>
          </div>
          <div className="profile-button-container">
          {profilePicture ? (
              <label htmlFor="profile-picture-input" className="profile-picture-label" onClick={removeProfilePicture}>
                Remove Profile Picture
              </label>
            ) : (
              <>
                <input
                  className="pic"
                  type="file"
                  accept="image/*"
                  id="profile-picture-input"
                //   onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profile-picture-input" className="profile-picture-label">
                  Add Profile Picture
                </label>
              </>
            )}
          </div>
          <div className="sign-out">
            <Link className="logout-button" to="/">
            <LogoutIcon />
             <span style={{fontSize:'18px', color: '#424343'}}> Logout</span>
            </Link>
          </div>
        </div>
      )}
        </div>    
        </header>
    )
}

export default Header;
