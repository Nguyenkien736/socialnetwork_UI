import React from "react";
import "./post.css"
import {useState, useContext, useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext'
import Addcomment from '../addcomment/addcomment'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Comment from '../comments/comments'
import CommentIcon from '@mui/icons-material/Comment';

const Post =({data,deleteCallback,showComment})=>{
    const {user} = useContext(AuthContext)
    const [visibility,setVisibility] = useState(false)
    const [commentVisibility,setCommentVisibility] =useState(false)
    const [comments,setComments] =useState([])
    const [commentBody,setCommentBody] = useState('')
    const postbody=data.body
    const [postCreator,setPostCreator] = useState('')

    const handleDelete = async ()=>{
        await axios.delete('/posts/'+data._id+'/delete')
        deleteCallback()
    }

    

    useEffect(()=>{
        
        const fetchCreator = async ()=>{
            const userRes = await axios.get(`/users/?userId=${data.creator_id}`)
            setPostCreator(userRes.data.username)
        }
        const fetchComment = async ()=>{
            const res = await axios.get(`/posts/${data._id}/getcomment`)
            
            setComments(res.data)
            console.log(comments)
    
        }
        fetchCreator()
        fetchComment()

    },[])
    const popupCloseHandler = (e)=>{
        setVisibility(e)
    }
    const commentpopupCloseHandler = (e)=>{
        setCommentVisibility(e)
    }

    const commentDeleteCb = async ()=> {
        const res = await axios.get(`/posts/${data._id}/getcomment`)
            
        setComments(res.data)

    }
    const addCommentHandler = async ()=>{
        const res = await axios.post(`/posts/${data._id}/createcomment`,{commentbody: commentBody,userId:user._id})



        setVisibility(!visibility)
        setCommentBody('')
        const fetchComment = async ()=>{
            const res = await axios.get(`/posts/${data._id}/getcomment`)
            
            setComments(res.data)
            console.log(comments)
    
        }
        fetchComment()

    }
    
    const showCommentHandler = ()=>{
        setCommentVisibility(!commentVisibility)
    }
    useEffect(()=>{

    },[commentVisibility,comments])

    return(
        <div className="postBody">
            <div className="creatorDisplay">Creator: {postCreator}</div>
            <hr className="divider"></hr>
            <Link to={"/threadpage/"+data.thread_id}>Show thread</Link>
            {
                user._id==data.creator_id?(<button onClick={handleDelete} >Delete</button>)
                :(<></>)
            }
            
            <div className="postbody">{postbody}</div>
            <hr className="divider"></hr>
            <div style={{display: 'flex', alignItems:'center',justifyContent:"center"}}>
            <button hidden={!showComment} onClick={e => setVisibility(!visibility)}><span style={{display:"flex",
        alignItems:"center",alignSelf:"flex-end",justifySelf:"right"}}>
                        <CommentIcon></CommentIcon>
                        Comment
                    </span></button>

                    </div>
            <hr className="divider"></hr>
    
            <div className="functionalBody">
            
            
            <Addcomment title="Comment" show={visibility} onClose={popupCloseHandler}>
                <span>{user.username+': '}</span>
                <input onInput={e => setCommentBody(e.target.value) } value ={commentBody} hidden={false}></input>
                <button onClick={addCommentHandler}>add Comment</button>

            </Addcomment>
            {
                comments.map((comment)=>(
                    <Addcomment tittle="comment" show={visibility} onClose={commentpopupCloseHandler}>
                        <Comment data={comment} deleteCb={commentDeleteCb} userId={comment.user_id} ></Comment>
                    </Addcomment>
                ))

            }
            
            
           
            </div>
        </div>
    )
}
export default Post;