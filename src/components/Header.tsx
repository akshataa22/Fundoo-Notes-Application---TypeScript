import React, {useEffect, useState} from 'react';
import logo from './../assets/icons/logo.png'
import menu from './../assets/icons/all icon.png'
import MenuIcon from "@mui/icons-material/Menu";
import { ViewStreamOutlined as ViewStreamOutlinedIcon } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { GridView as GridViewIcon } from '@mui/icons-material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import base_url from '../api/baseapi';
import './../styles/Header.scss'

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
  toggleLayoutMode: () => void;
  layoutMode: 'vertical' | 'horizontal';
  onSearch: (searchText: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar ,pageTitle , toggleLayoutMode, layoutMode, onSearch}) => {
    const [showUserCard, setShowUserCard] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');
    const email = localStorage.getItem('email');

    const navigate = useNavigate();

    const toggleUserCard = () => {
        setShowUserCard(!showUserCard);
      };    

    const firstInitial = username ? username.charAt(0).toUpperCase() : '';
    
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
  
        try {
          const response = await axios.post(`${base_url}/user/uploadProfileImage?access_token=${token}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          if (response.status === 200) {
            setProfilePicture(URL.createObjectURL(event.target.files[0]));
            console.log('Profile picture uploaded successfully');
          }
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        }
      }
    };
    
    const removeProfilePicture = () => {
        setProfilePicture(null);
      };

      const handleLogout = async () => {
        try {
            const response = await axios.post(`${base_url}/user/logout?access_token=${token}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (response.status === 204) {
                localStorage.removeItem('token');
                localStorage.removeItem('firstName');
                localStorage.removeItem('lastName');
                navigate('/'); 
                console.log('Logout successful');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };  

    useEffect(() => {
      setUsername(`${email}`);
  }, [email]);

    const handleRefresh = () => {
      window.location.reload(); 
    };

    return (
        <header>
            <div className='part1'>
                <div className="mainMenu">
        <button title="Main Menu" onClick={toggleSidebar}>
          <i className="menu">
            <MenuIcon fontSize="medium" />
          </i>
        </button>
      </div>
                <div className='logos'>
                    <img src={logo} alt="logo" id='logo' />
                    <span className="logo-text">{pageTitle}</span>
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
                            <input type="text" placeholder="Search" className="search-input" onChange={(e) => onSearch(e.target.value)}/>
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
                  <div onClick={handleRefresh}>
                    <RefreshOutlinedIcon /></div>
                    <div className="layout-toggle" onClick={toggleLayoutMode}>
                    {layoutMode === 'vertical' ? (
              <ViewStreamOutlinedIcon fontSize="medium" />
            ) : (
              <GridViewIcon fontSize="medium" />
            )}
                  </div>
                    <SettingsOutlinedIcon />
                </div>
            </div>    
            <div className='part3'>
                <div>
                    <img className='menu' src={menu} alt="menu" />
                </div>
                <div className="user-circle" onClick={toggleUserCard}>
        {profilePicture ? (
        <>
         <img src={profilePicture} alt="Profile" className="profile-picture" />
        </>
        ) : <span>{firstInitial}</span> }
      </div>
      {showUserCard && (
        <div className="user-card">
          <div className="user-info">
            <p className='username'>{username}</p>
          </div>
          <div className="profile-button-container">
            <label htmlFor="profile-picture-input" className="profile-picture-label">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="profile-picture" />
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
              style={{ display: 'none' }}
            />
          </div>

          <p className='account'>Hi, {firstName}!</p>

          <div className="account-actions">
            <button className="add-account-button">Add Account</button>
            <button className="sign-out-button" onClick={handleLogout}>
              <LogoutIcon style={{ marginRight: 5 }} />
              Logout
            </button>
          </div>
        </div>
      )}
        </div>    
        </header>
    )
}

export default Header;
