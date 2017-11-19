import React from 'react';
import { connect } from 'react-redux';

export const VideoViewer = () => {
  const dummyData = {
    title: 'Solving SEO with Headless Chrome (Polymer Summit 2017)',
    provider: 'youtube',
    dateAdded: ' Nov 18th, 2017',
    url: 'https://www.youtube.com/watch?v=ydThUDlBDfc',
    videoId: 'ydThUDlBDfc',
    embed: 'https://www.youtube.com/embed/ydThUDlBDfc'
    //embed links different for different sites
    //"https://embed.vevo.com?isrc=USREV0100011"
    //"https://player.vimeo.com/video/49384334"
    //"//www.dailymotion.com/embed/video/x661976"
  };

  return (
    <div>
      <h2>{dummyData.title}</h2>
      <h5>{`${dummyData.provider}.com`} </h5>
      <h5>{dummyData.dateAdded}</h5>
      <h5>
        <a href={dummyData.url}> Go to original </a>
      </h5>
      <iframe
        width="640"
        height="390"
        src={dummyData.embed}
        allowfullscreen="true"
      />
    </div>
  );
};


export default connect(null)(VideoViewer);
