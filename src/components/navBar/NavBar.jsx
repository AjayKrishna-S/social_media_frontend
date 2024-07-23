import React, { useContext } from 'react';
import './navBar.scss';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

const NavBar = () => {

    const { darkMode, toggle } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)

  return (
    <div className='navBar'>
        <div className='left'>
            <Link to='/' style={{textDecoration:"none"}}>
                <span>MeetUp</span>
            </Link>
            <HomeOutlinedIcon />
            {darkMode ? <LightModeOutlinedIcon onClick = { toggle }/> : <DarkModeOutlinedIcon onClick = { toggle } />}
            <GridViewOutlinedIcon />
            <div className='search'>
                <SearchOutlinedIcon />
                <input type='text' placeholder='Search'/>
            </div>
        </div>
        <div className='right'>
            <div className="rightIcons">
                <PersonOutlineOutlinedIcon />
                <MailOutlinedIcon />
                <NotificationsOutlinedIcon />
            </div>
            <Link 
                to={`/profile/${currentUser.id}`}
                style={{textDecoration:'none', color:'inherit'}}
            >
                <div className='user'>
                        <img src={"/upload/"+currentUser.profilePic} alt="currentuserpicture"></img>
                        <span>{currentUser.name}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default NavBar