import React from 'react'
import { connect } from 'react-redux';

export const VideoViewer = () => {
  const dummyData = {
    title: 'Solving SEO with Headless Chrome (Polymer Summit 2017)',
    provider: 'youtube',
    date: ' Nov 18th, 2017',
    videoId: 'ydThUDlBDfc',
    embed: "https://www.youtube.com/embed/ydThUDlBDfc"
    //embed links different for different sites
    //"https://embed.vevo.com?isrc=USREV0100011" 
    //"https://player.vimeo.com/video/49384334"
    //"//www.dailymotion.com/embed/video/x661976"
  };

  return (
    <div>
      <h2>{dummyData.title}</h2>
      <h5>{`${dummyData.provider}.com`} </h5>
      <h5>{dummyData.date}</h5>
      <iframe width="640" height="390" src={dummyData.embed} frameborder="0" allowfullscreen></iframe>
    </div>
  );
};
const mapState = state => {
  return {
  };
};

export default connect(mapState)(VideoViewer);