import React, { useState } from 'react';
import { SliderData } from './SliderData';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import  Post  from '../post/post';

const Slider = ({ slides ,cbfun }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const currentstate=current
 

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
   
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <ArrowCircleLeftIcon  className='left-arrow' onClick={prevSlide} />
      <ArrowCircleRightIcon  className='right-arrow' onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
              
            {index === current && (
                <div>
              <Post data={slide}></Post>
              <button onClick={()=>{cbfun(current)}}>show next post</button>
              </div>
           )}
          </div>
        );
      })}
    </section>
  );
};

export default Slider;