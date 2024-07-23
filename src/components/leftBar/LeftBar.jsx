import React, { useContext } from 'react';
import './leftBar.scss';
import Friends from '../../assets/friends.png';
import Groups from '../../assets/groups.png';
import Market from '../../assets/marketplace.png';
import Memories from '../../assets/memories.png';
import Events from '../../assets/events.png';
import Gaming from '../../assets/gaming.png';
import Gallery from '../../assets/gallery.png';
import Videos from '../../assets/videos.png';
import Messages from '../../assets/message.png';
import Tutorials from '../../assets/tutorials.png';
import Courses from '../../assets/courses.png';
import Fund from '../../assets/fundraiser.png';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext)

  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <Link 
            to={`/profile/${currentUser.id}`}
            style={{textDecoration:'none', color:'inherit'}}
          >
            <div className="user">
              <img src={"/upload/"+currentUser.profilePic} alt="leftbaritems"></img>
              <span>{currentUser.name}</span>
            </div>
          </Link>
            <div className="item">
              <img src={Friends} alt="leftbaritems" />
              <span>Friends</span>
            </div>
            <div className="item">
              <img src={Groups} alt="leftbaritems" />
              <span>Groups</span>
            </div>
            <div className="item">
              <img src={Market} alt="leftbaritems" />
              <span>Marketplace</span>
            </div>
            <div className="item">
              <img src={Memories} alt="leftbaritems" />
              <span>Memories</span>
            </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={Events} alt="leftbaritems" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="leftbaritems" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="leftbaritems" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="leftbaritems" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="leftbaritems" />
            <span>Messages</span>
          </div>
        </div>

        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="leftbaritems" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="leftbaritems" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="leftbaritems" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar