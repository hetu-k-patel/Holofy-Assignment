import React from 'react';

import './App.css';
import video from './videos/video.mp4';
import DragAndDrop from './DragAndDrop';

let videoPlayerSize = {
   width: '300px',
   height: '200px',
};

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <DragAndDrop videoPlayerSize={videoPlayerSize}>
               <div className="videoPlayer" style={videoPlayerSize}>
                  <video controls>
                     <source src={video} type="video/mp4" />
                  </video>
               </div>
            </DragAndDrop>
         </header>
      </div>
   );
}

export default App;
