import React from "react";

import Post from "../post/post";
import { useState,useEffect,useContext } from "react";
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import Addthread from "../addthread/addthread";
import {Thread} from '../thread/thread'
import GroupThreadWrapper from '../groupthreadwrapper/groupthreadwrapper'
export default function GroupFeed({groupid,refreshFlag}){
    const [threads,setThreads] = useState([])
    useEffect(()=>{

        const fetchThreads = async ()=>{
            const res = await axios.get('/groups/'+groupid+'/getthreads')
            
            setThreads(res.data)
        }
        fetchThreads()
        let abortController = new AbortController();  
    // your async action is here  
    return () => {  
    abortController.abort();  
    }  
    },[])
    useEffect(()=>{

    },[threads,refreshFlag])
    const resetCb = async ()=>{
        const res = await axios.get('/groups/'+groupid+'/getthreads')
            
        setThreads(res.data)

    }
    return (
        
        <div>

            <div>
                {
                    threads.map((thread)=>(

                        <GroupThreadWrapper threadId={thread.thread_id} dlCb={resetCb}>
                        </GroupThreadWrapper>
                     ))
                }

            </div>

            
           
        </div>
    )

    


}