import './profile.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Posts from '../../components/posts/Posts.jsx';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../../axios.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext.js';
import Update from '../../components/update/Update.jsx';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
        return makeRequest.get("users/find/"+ userId).then((res) => {
            return res.data;
        });
    },
  });

  const { data : followedUserId, error : rError, isLoading : rIsLoading } = useQuery({
    queryKey: ["reletionships",userId],
    queryFn : () => {
      return makeRequest.get(`/reletionships?userId=${currentUser.id}`).then(res => {
        return res.data;
      })
    }
  })

  const queryClient = useQueryClient(); 
  const mutation = useMutation({
      mutationFn: (followed) => {
          if(followed) makeRequest.delete("/reletionships?userId="+ userId)
          return makeRequest.post('/reletionships?',{userId});
      },
      onSuccess: () => {
          queryClient.invalidateQueries(["reletionship"]);
      }
  });

  const handleFollow = () =>{
    mutation.mutate(rIsLoading ? "loading" :followedUserId.includes(userId))
  }
  return (
    <div className='profile'>
      {isLoading ? "loading"
      : <>
        <div className="images">
          <img src={"/upload/" + data.coverPic} alt="Cover Picture" className='cover'/>
          <img src={"/upload/" + data.profilePic} alt="" className='profilePicture'/>
        </div>
        <div className="profileContainer">
          <div className="userInfo">
            <div className="left">
              <LocationOnIcon fontSize='large'/> <span>{data.location}</span>
            </div>
            <div className="middle">
              <span className="name">{data.name}</span>
              <span className="about">{data.bio}</span>
              {rIsLoading
                ? "Loading.."
                : userId === currentUser.id
                  ? (<button onClick={() => setOpenUpdate(true)}>Update</button>)
                  : (<button onClick={handleFollow}>
                      {(followedUserId.includes(userId))
                      ? "Following"
                      : "Follow"
                      }     
                    </button>)
              }
            </div>
            <div className="right">
              <MailOutlineOutlinedIcon />
              <MoreVertOutlinedIcon />
            </div>
          </div>
          <Posts userId = {userId}/>
        </div>
      </>}
    { openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}

export default Profile