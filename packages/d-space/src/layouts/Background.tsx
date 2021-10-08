import React from 'react';

const background = "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #181A25 100%), url('/bg.jpg')"

const Background = () => (
  <div className="Background">
    <div className="Background--header" style={{ background }}/>
    <div className="Background--content"/>
  </div>
);

export default Background;
