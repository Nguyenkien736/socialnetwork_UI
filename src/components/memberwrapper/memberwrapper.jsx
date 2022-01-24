import React from 'react'
import axios from 'axios'
import Usertab from '../usertab/usertab'

export default function MemberWrapper({memberId,groupId}){
    const deleteMemberHandler = async () =>{
       await axios.post('/groups/'+groupId+'/deletemember',{userId:memberId})

    }
    return(
        <div>
            <Usertab userId={memberId}>

            </Usertab>
            <button onClick={deleteMemberHandler}>kick</button>
        </div>
    )
}