import './post.scss';
import Comments from '../comments/Comments.jsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import moment from 'moment';
import { AuthContext } from '../../context/authContext.js';
import { makeRequest } from '../../axios.js';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Post = ({post}) => {
    const postId = post.id;
    const [menuOpen, setMenuOpen] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const { currentUser } = useContext(AuthContext)

    const { data, error, isLoading } = useQuery({
        queryKey: ["likes", postId],
        queryFn: () => {
            return makeRequest.get(`/likes?postId=${postId}`).then((res) => {
                return res.data;
            });
        },
    });

    const queryClient = useQueryClient(); 
    const mutation = useMutation({
        mutationFn: (liked) => {
            if(liked) makeRequest.delete('/likes?postId='+postId);
            return makeRequest.post('/likes', {postId});
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["likes"]);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (postId) => {
            return makeRequest.delete("/posts/"+ postId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    const handleLikes = () => {
        mutation.mutate(data.includes(currentUser.id));
    }

    const handleDelete = () => {
        console.log("working");
        deleteMutation.mutate(postId);
    }

  return (
    <div className='post'>
        <div className="container">
            <div className="user">
                <Link 
                    to={`/profile/${post.userid}`}
                    style={{textDecoration:'none', color:'inherit'}}
                >
                    <div className='userData'>
                        <img src={"/upload/"+post.profilePic} alt={post.name} />
                        <div className="details">
                            <span className='name'>{post.name}</span>
                            <span className='date'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                </Link>
                <div className='more'>
                    {currentUser.id === post.userid &&
                        <MoreHorizIcon onClick={()=> setMenuOpen(!menuOpen)}/>
                    }   
                    <div className='delete-btn'>
                        {menuOpen && <button onClick={() => handleDelete()}>Delete</button>}
                    </div>
                </div>
            </div>
            <div className="content">
                <p>{post.desc}</p>
                {post.img && 
                    <img src={"../upload/"+ post.img} alt={post.name} />
                }
            </div>
            <div className="info">
                <div className="item">
                    { isLoading ? "Loading" 
                        : data.includes(currentUser.id) 
                            ? <FavoriteOutlinedIcon 
                                style={{color : "red"}} 
                                onClick ={handleLikes}/> 
                            : <FavoriteBorderOutlinedIcon 
                                onClick ={handleLikes}/>}
                    {isLoading ? "Loading" 
                        : data.length}
                </div>
                <div className="item" 
                    onClick={()=> setCommentOpen(!commentOpen)}>
                    <CommentOutlinedIcon />
                    Commants
                </div>
                <div className="item">
                    <ShareOutlinedIcon /> 
                    Share
                </div>
            </div>
            {commentOpen && <Comments postId = {post.id}  />}
        </div>
    </div>
  )
}

export default Post