import './stories.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Stories = () => {
    const { currentUser } = useContext(AuthContext);

    const stories = [
        {
            id: "001",
            name: "Tony Stark",
            img: "https://images.pexels.com/photos/2350074/pexels-photo-2350074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "002",
            name: "Tony Stark",
            img: "https://images.pexels.com/photos/2350074/pexels-photo-2350074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "003",
            name: "Tony Stark",
            img: "https://images.pexels.com/photos/2350074/pexels-photo-2350074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "004",
            name: "Tony Stark",
            img: "https://images.pexels.com/photos/2350074/pexels-photo-2350074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },

    ];

  return (
    <div className='stories'>
        <div className='story'>
                    <img src={"/upload/"+currentUser.profilePic} alt={currentUser.name}/>
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
        {stories.map((story) => {
            return(
                <div className='story' key={story.id}>
                    <img src={story.img} alt={story.name}/>
                    <span>{story.name}</span>
                </div>
            )  
        })}
    </div>
  )
}

export default Stories