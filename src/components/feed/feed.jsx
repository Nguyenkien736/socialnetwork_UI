import React from "react";
import "./feed.css"
import Post from "../post/post";
import { useState,useEffect,useContext } from "react";
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import Addthread from "../addthread/addthread";
export default function Feed({username}){
    const {user}= useContext(AuthContext)
    const [visibility, setVisibility] = useState(false);
    const [threadTittle, setThreadTittle] = useState("")
    const [posts,setPosts]=useState([])
    const showCommentButton=false

    const popupCloseHandler = (e) => {
      setVisibility(e);
    };

    const addThreadHandler = async ()=>{
        const res = await axios.post('/threads/createthread',{userId:user._id,tittle:threadTittle})
        setVisibility(!visibility)

    }

    const postDlCb = async ()=>{
        const res = username ? await axios.get(`/posts/getbyUsername/${username}`)
            : await axios.get(`/posts/timeline/${user._id}`)
            setPosts(res.data)


    }




    
    useEffect(()=>{
        const fetchPost=async () => {
            const res = username ? await axios.get(`/posts/getbyUsername/${username}`)
            : await axios.get(`/posts/timeline/${user._id}`)
            setPosts(res.data)

        }

        fetchPost()
    },[])

    useEffect(()=>{

    },[posts])

    return(
        <div className="feeds">
             {
                username ? (
                    <div></div>

                ): (<button onClick={(e) => setVisibility(!visibility)}>new thread</button>)
            }

            {
                posts ?
                posts.map((p)=>(
                    <Post data={p} deleteCallback={postDlCb} showComment={showCommentButton}>user have post</Post>
                )
                )
                : (<div>user dont have post</div>)
            }
           
            
<Addthread className="addThreadForm"
  onClose={popupCloseHandler}
  show={visibility}
  title="Share new thread"
>
    <div className="userName">{user.username}</div><span>want to write:</span>
    <textarea className="newThreadInput" type="text" placeholder="thread tittle" cols={50} rows={4} onInput={e => setThreadTittle(e.target.value)}></textarea>
    <button onClick={addThreadHandler}>Add</button>
  
</Addthread>
           
           
        </div>

    )
}