import './update.scss'
import { makeRequest } from '../../axios'
import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'

const Update = ({setOpenUpdate, user}) => {
  const { currentUser } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [cover, setCover] = useState(null)
  const [text, setText] = useState({
    name : user.name,
    bio : user.bio,
    location : user.location
  })

  const handleChange = (e) => {
    setText((prev) => ({...prev,[e.target.name] : [e.target.value]}));
  }

  const upload = async (file) =>{
    try{
      const formData = new FormData();
      formData.append('file',file);
      const res = await makeRequest.post("/upload",formData);
      return res.data;
    }
    catch(err){
      console.log("err" + err);
    }
  }

  const queryClient = useQueryClient(); 

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put('/users', user);
    },
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["user"]);
    }
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let profileUrl = profile ? await upload(profile) : user.profilePic
    let coverUrl = cover ? await upload(cover) : user.coverPic
    mutation.mutate({...text, profilePic : profileUrl, coverPic : coverUrl});
    setOpenUpdate(false);
    };

  return (
    <div className='update'>
        <div className='header'>
          <span></span>
          <span>Edit Profile</span>
          <button onClick={() => setOpenUpdate(false)}>X</button>
        </div>
        
        <form >
          <div className='img-container'>
            <div className='upload-img'>
              <input name='profilePic' id='profile' type="file" style={{display:"none"}} onChange={(e) => setProfile(e.target.files[0])}/>
              <label htmlFor="profile">
                <div className='item'>
                  <img src={"/upload/"+currentUser.profilePic} alt="update-pic" />
                  <span className='upload-btn'>+</span>
                  <span className='upload-label'>Profile Picture</span>
                </div>
              </label>
              <div className='img-url'>
                {profile && <img src={URL.createObjectURL(profile)} alt="" /> }
              </div>
            </div>

            <div className='upload-img'>
              <input type='file' name='coverPic' id='cover' style={{display:"none"}} onChange={(e) => setCover(e.target.files[0])}/>
              <label htmlFor="cover">
                <div className='item'>
                <img src={"/upload/"+currentUser.coverPic} alt="update-pic" />
                  <span className='upload-btn'>+</span>
                  <span className='upload-label'>Cover Picture</span>
                </div>
              </label>
              <div className='img-url'>
                {cover && <img src={URL.createObjectURL(cover)} alt="" /> }
              </div>
            </div>
          </div>
          <label htmlFor="name">Name</label>
          <input name='name' placeholder={user.name} type="text" onChange={handleChange}/>
          <label htmlFor="bio">About</label>
          <input name='bio' placeholder={user.bio} type="text" onChange={handleChange}/>
          <label htmlFor="location">Place</label>
          <input name='location' placeholder={user.location} type="text" onChange={handleChange}/>
          <button className='submit-btn' type='submit' onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Update