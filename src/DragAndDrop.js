import React, { useEffect, useState } from 'react';

import './App.css';

let windowWidth = window.innerWidth,
   windowHeight = window.innerHeight;

let clientX = 0,
   clientY = 0;

function DragAndDrop({ children, videoPlayerSize }) {
   const [isDragging, setIsDragging] = useState(false);
   const [position, setPosition] = useState({
      position: 'absolute',
      top: windowHeight - parseInt(videoPlayerSize.height) - 10 + 'px',
      left: '10px',
   });

   useEffect(() => {
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
            left: windowWidth - parseInt(videoPlayerSize.width) - 10 + 'px',
            top: 10 + 'px',
         });
      } else if (clientX < windowWidth / 2 && clientY > windowHeight / 2) {
         setPosition({
            ...position,
            left: 10 + 'px',
            top: windowHeight - parseInt(videoPlayerSize.height) - 10 + 'px',
         });
      } else if (clientX > windowWidth / 2 && clientY > windowHeight / 2) {
         setPosition({
            ...position,
            left: windowWidth - parseInt(videoPlayerSize.width) - 10 + 'px',
            top: windowHeight - parseInt(videoPlayerSize.height) - 10 + 'px',
         });
      }
   };

   const handlePointerMove = (e) => {
      if (isDragging) handleDragMove(e);
   };

   const handleDragMove = (e) => {
      let x = 0,
         y = 0;

      if (e.type === 'touchmove') {
         x = e.changedTouches[0].pageX - parseInt(videoPlayerSize.width) / 2;
         y = e.changedTouches[0].pageY - parseInt(videoPlayerSize.height) / 2;
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
               {children}
            </div>
         </header>
      </div>
   );
}

export default DragAndDrop;
