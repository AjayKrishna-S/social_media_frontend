import React from 'react';
import './rightBar.scss';
import profile from '../../assets/images/peter-profile.JPG';

const RightBar = () => {
  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/1c/db/dd/1cdbdd7cc65b9c287c95e0517ca02dc2.jpg' alt="activities"/>
              <span>Sundar Pichai</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/a0/a6/14/a0a614afa4bbd8ea899dbc991d7268da.jpg' alt="activities"/>
              <span>Mark Zuckerberg</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={profile} alt="activities"/>
              <p><span>Peter Parker</span> changed their profile picture</p>
            </div>
            <span className='time'>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/b3/aa/ac/b3aaac681f22e35ed2c50fcf4f3e0fbd.jpg' alt="activities"/>
              <p><span>Jeff Bezos</span> update their story</p>
            </div>
            <span className='time'>25 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/a8/5c/37/a85c371aaee07952889c5605c96aeb60.jpg' alt="activities"/>
              <p><span>Elon Musk</span> changed their cover picture</p>
            </div>
            <span className='time'>30 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/a0/ac/e3/a0ace3ac45fbd8d3d35be52879a11e29.jpg' alt="activities"/>
              <p><span>Ben Tenison</span> changed their profile picture</p>
            </div>
            <span className='time'>1 hour ago</span>
          </div>

        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/1a/20/41/1a2041690dc846d61a6e3c39f06751aa.jpg' alt="activities"/>
              <div className='online' />
              <span>The Undertaker</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/a0/ac/e3/a0ace3ac45fbd8d3d35be52879a11e29.jpg' alt="activities"/>
              <div className='online'></div>
              <span>Ben Tenison</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://i.pinimg.com/564x/a8/5c/37/a85c371aaee07952889c5605c96aeb60.jpg' alt="activities"/>
              <div className='online'></div>
              <span>Elon Musk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar