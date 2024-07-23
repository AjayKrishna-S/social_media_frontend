import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
const Comments = (post) => {
    const {postId} = post;
    const { currentUser } = useContext(AuthContext)
    const [desc, setDesc] = useState("");

    const { data, error, isLoading } = useQuery({
        queryKey:["comments", postId],
        queryFn: () => {return makeRequest.get("/comments?postId=" + postId).then((res)=>{       
            return res.data;})
        }
    });

    const queryClient = useQueryClient(); 
    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest.post('/comments', newComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
        }
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        mutation.mutate({desc,postId});
        setDesc("");
    };

  return (
    <div className='comments'>
        <div className="write">
            <img src={"../upload/" + currentUser.profilePic} alt={currentUser.name} />
            <input 
                type="text" 
                placeholder='Write a comment' 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handleSubmit}>Send</button>
        </div>
        {isLoading ? "Loading..."
            :   data.map((comment)=>{
                    return (
                    <div className='comment' key={comment.id}>
                        <img src={"../upload/" + comment.profilePic} alt={comment.name}/>
                        <div className='info'>
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                    </div>)  
            })}
    </div>
  )
}

export default Comments