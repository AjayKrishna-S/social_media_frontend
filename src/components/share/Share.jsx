import './share.scss';
import { makeRequest } from "../../axios.js";
import UploadIcon from "../../assets/upload.png";
import LocationIcon from "../../assets/add-location.png";
import TagIcon from "../../assets/tag-friend.png";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext.js';
import { useQueryClient,useMutation } from '@tanstack/react-query';

const Share = () => {
    const { currentUser } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const upload = async () =>{
        try{
            const formData = new FormData();
            formData.append('file',file);
            const res = await makeRequest.post("/upload",formData);
            return res.data;
        }
        catch(err){
            console.log("err" + err);
        }
    };

    const queryClient = useQueryClient(); 

    const mutation = useMutation({
        mutationFn: (newPost) => {
            return makeRequest.post('/posts', newPost);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let imgUrl = "";
        if(file) imgUrl = await upload();
        mutation.mutate({desc, img:imgUrl});
        setDesc("");
        setFile(null);
    };

  return (  
    <div className='share'>
        <div className="container">
            <div className="top">
                <div className="left">
                    <img src={"/upload/"+currentUser.profilePic} alt="profilePic" />
                    <input 
                        type="text" 
                        placeholder={`What's on your mind ${currentUser.name}?`} 
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <div className="right">
                    { file && <img src={URL.createObjectURL(file)} alt="" className='file'/>}
                </div>
            </div>
            <hr />
            <div className="bottom">
                <div className="left">
                    <input type="file" id="file" style={{display:"none"}} onChange={e => setFile(e.target.files[0])}/>
                    <label htmlFor="file">
                        <div className='item'>
                            <img src={UploadIcon} alt="upload" />
                            <span>Add Image</span>
                        </div>
                    </label>
                    <div className="item">
                        <img src={LocationIcon} alt="map" />
                        <span>Add Place</span>
                    </div>
                    <div className='item'>
                        <img src={TagIcon} alt="Tag" />
                        <span>Tag Friends</span>
                    </div>
                </div>
                <div className="right">
                    <button onClick={handleSubmit}>Share</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Share