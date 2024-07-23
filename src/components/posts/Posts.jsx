import React from 'react';
import './posts.scss';
import Post from '../post/Post.jsx';
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios.js';


const Posts = ({userId}) => {

   const { data,error, isLoading } = useQuery({
    queryKey:["post"],
    queryFn:() => makeRequest.get("/posts?userId="+userId).then((res)=>{
      return res.data;
    })});

  return (
    <div className='posts'>
      { error 
        ? "somthing went worng!" 
        : isLoading 
        ? "loading..."
        : data.map((post)=>{
          return <Post
          post = {post}
          key= {post.id}
        />
          
        })
      }
    </div>
  )
}

export default Posts