///render threads

import React from "react";
import  Post  from "../post/post";
import Slider from "../slide/slide";
import { SliderData } from "../slide/SliderData";
import "./thread.css"
import axios from 'axios'
import Addthread from '../addthread/addthread'

import {useState, useEffect,useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteIcon from '@mui/icons-material/Delete';




export function Thread({data,deleteCallback}){
    const {user} = useContext(AuthContext)
    
    

    
    const [posts,setPosts] =useState([])
    const [saved,setSaved] = useState(false)
    
    const [showingPosts,setShowingPosts] =useState([])
    const [currentPost,setCurrentPost]= useState({})
    const [firstPost,setFirstPost]= useState({})
    const [visibility,setVisibility] = useState(false)
    const [postBody,setPostBody] =useState("")

    const popupCloseHandler = (e) => {
        setVisibility(e);
      };
      const handleDelete = async ()=>{
          const res = await axios.delete(`/threads/${data._id}/delete`)
          deleteCallback()
          
      }
  
      const addPostHandler = async ()=>{
          const res = await axios.post('/posts/createpost',{userId:user._id,postbody:postBody,threadId:data._id})
          const postClone = JSON.parse(JSON.stringify(posts));
          

            

          postClone.push(res.data)
          setVisibility(!visibility)

          setPosts(postClone)
          if(showingPosts.length==0) {
              const arr=[]
              arr.push(res.data)
              setShowingPosts(arr)

          }
          setPostBody('')
  
      }
    const postDeleteCb = async ()=>{
        const res= await axios.get(`/posts/getByThread/${data._id}`)
            if(res.data.length!=0)
            {
            
            const sortedPosts= res.data.sort((a,b)=> a.create_at>b.create_at?true:false )

            const arr = []
            arr.push(sortedPosts[0])
            setShowingPosts(arr)
            }
            
            setPosts(res.data.sort((a,b)=> a.create_at>b.create_at?true:false )) 

    }
   

    function showNextPost() {
        const fetchPost=  ()=>{
           

           

            const arr = posts.filter(item => {
                for(let i=0;i<showingPosts.length;i++)
                {
                    if(item._id==showingPosts[i]._id) return false
                    console.log(0)
                }
                return true
            })
            console.log(showingPosts)

            

            const postClone = JSON.parse(JSON.stringify(showingPosts));

            

            postClone.push(arr[0])

            setShowingPosts(postClone)
        }
        if(showingPosts.length<posts.length)
        fetchPost()
    }

    
    useEffect(()=>{

    },[showingPosts,posts,saved])
    
    
    useEffect(()=>{
        
        const fetchPost = async ()=>{
           
            const res= await axios.get(`/posts/getByThread/${data._id}`)
            const chkSaved = await axios.get(`/threads/${data._id}/checksaved/${user._id}`)
            setSaved(chkSaved.data)
            if(res.data.length!=0)
            {
            
            const sortedPosts= res.data.sort((a,b)=> a.create_at>b.create_at?true:false )

            const arr = []
            arr.push(sortedPosts[0])
            setShowingPosts(arr)
            }
            
            setPosts(res.data.sort((a,b)=> a.create_at>b.create_at?true:false ))    
        }
        fetchPost()
        //console.log(posts)
            

        
    },[data])

    const saveThreadHandler= async ()=>{
        const res = await axios.post('/threads/'+data._id+'/savethread',{userId:user._id})
        const chkSaved = await axios.get(`/threads/${data._id}/checksaved/${user._id}`)
        setSaved(chkSaved.data)
    }
    



    const currentstate=0
    return(
        <div className="threadBody">
            
            <div className="threadtittle">Thread Tittle: {data.tittle}</div> 
            <div id="postBody">
                {
                    showingPosts.map((post)=>(
                        <div>
                        <Post data={post} deleteCallback={postDeleteCb} showComment={true}></Post>
                        <button className="nextButton" onClick={showNextPost}><KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon> </button>
                        </div>
                    ))
                }
                <div className="buttonSection">
                    {
                        user._id == data.creator_id?(<button className="buttons" onClick={(e) => setVisibility(!visibility)}>
                        <AddBoxIcon></AddBoxIcon>
                    </button>):(<></>)

                    }

                
                {
                    user._id == data.creator_id ? (
                        <button className="buttons" onClick={handleDelete}><DeleteIcon></DeleteIcon> </button>
                    ): (
                        <></>
                    )
                }
                {
                    saved ?(
                        <></>
                        
                    ):(<button className="buttons" onClick={saveThreadHandler}><BookmarkAddIcon></BookmarkAddIcon></button>)
                                    
                }
                </div>
               
                <Addthread
                onClose={popupCloseHandler}
                show={visibility}
                title="Write something"
                >
                <textarea cols={50} rows={8} type="text" placeholder="post body" onInput={e => setPostBody(e.target.value)} value={postBody}></textarea>
                <button onClick={addPostHandler}>Add</button>
  
</Addthread>
            </div>

        </div>
    )
}