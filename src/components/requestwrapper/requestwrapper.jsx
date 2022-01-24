import React from 'react'
import axios from 'axios'
import Usertab from '../usertab/usertab'

export default function RequestWrapper({requestMemberId,groupId}){
    const requestAcceptHandler = async()=>{
        await axios.post('/groups/'+groupId+'/addmember',{userId:requestMemberId})
        await axios.post('/groups/'+groupId+'/deleterequestmember',{userId:requestMemberId})

    }
    const requestDeclineHandler = async()=>{
        await axios.post('/groups/'+groupId+'/deleterequestmember',{userId:requestMemberId})
        
    }
    
    return(
        <div>
            <Usertab userId={requestMemberId}>

            </Usertab>
            <button onClick={requestAcceptHandler}>accept</button>
            <button onClick={requestDeclineHandler}>decline</button>
        </div>
    )
}