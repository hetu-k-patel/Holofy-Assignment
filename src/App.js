import React, { useEffect, useRef, useState } from 'react';

import './App.css';
import video from './videos/video.mp4';

let windowWidth = 0,
   windowHeight = 0;

let clientX = 0,
   clientY = 0;

let isVideoPaused = true;

function App() {
   const [isDragging, setIsDragging] = useState(false);
   const [position, setPosition] = useState({
      position: 'absolute',
      top: '10px',
      left: '10px',
   });
   const videoEl = useRef(null);

   useEffect(() => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      const setWindowWidth = (e) => {
         windowWidth = e.target.innerWidth;
         windowHeight = e.target.innerHeight;
      };
      window.addEventListener('resize', setWindowWidth);

      return () => {
         window.removeEventListener('resize', setWindowWidth);
      };
   }, []);

   const handlePointerDown = (e) => {
      if (videoEl.current.paused) {
         isVideoPaused = true;
      } else {
         isVideoPaused = false;
      }
      videoEl.current.pause();

      setIsDragging(true);
   };

   const handlePointerUp = (e) => {
      setIsDragging(false);

      if (e.type === 'touchend') {
         clientX = e.changedTouches[0].clientX;
         clientY = e.changedTouches[0].clientY;
      } else {
         clientX = e.clientX;
         clientY = e.clientY;
      }

      if (clientX < windowWidth / 2 && clientY < windowHeight / 2) {
         setPosition({
            ...position,
            left: '10px',
            top: '10px',
         });
      } else if (clientX > windowWidth / 2 && clientY < windowHeight / 2) {
         setPosition({
            ...position,
            left: windowWidth - e.target.offsetWidth - 10 + 'px',
            top: 10 + 'px',
         });
      } else if (clientX < windowWidth / 2 && clientY > windowHeight / 2) {
         setPosition({
            ...position,
            left: 10 + 'px',
            top: windowHeight - e.target.offsetHeight - 10 + 'px',
         });
      } else if (clientX > windowWidth / 2 && clientY > windowHeight / 2) {
         setPosition({
            ...position,
            left: windowWidth - e.target.offsetWidth - 10 + 'px',
            top: windowHeight - e.target.offsetHeight - 10 + 'px',
         });
      }

      if (isVideoPaused) {
         videoEl.current.pause();
      } else {
         videoEl.current.play();
      }
   };

   const handlePointerMove = (e) => {
      if (isDragging) handleDragMove(e);
   };

   const handleDragMove = (e) => {
      let x = 0,
         y = 0;

      if (e.type === 'touchmove') {
         x = e.changedTouches[0].pageX - e.target.offsetWidth / 2;
         y = e.changedTouches[0].pageY - e.target.offsetHeight / 2;
      } else {
         x = parseInt(position.left) + e.movementX;
         y = parseInt(position.top) + e.movementY;
      }

      setPosition({
         ...position,
         left: x + 'px',
         top: y + 'px',
      });
   };

   return (
      <div className="App">
         <header className="App-header">
            <div
               onPointerDown={handlePointerDown}
               onPointerUp={handlePointerUp}
               onPointerMove={handlePointerMove}
               style={position}
               onTouchStart={handlePointerDown}
               onTouchMove={handlePointerMove}
               onTouchEnd={handlePointerUp}
            >
               <div className="videoPlayer">
                  <video controls ref={videoEl}>
                     <source src={video} type="video/mp4" />
                  </video>
               </div>
            </div>
         </header>
      </div>
   );
}

export default App;
