///render stories
import React from "react";
import  Post  from "../post/post";
import Slider from "../slide/slide";
import { SliderData } from "../slide/SliderData";
import "./story.css"

export function Story(){
   
    return(
        <div>
            <div className="threadtittle">Thread Tittle</div>
            <Post></Post> 
        </div>
    )
}