'use client';
import React, { useEffect } from 'react';

const YouTubeVideo = ({ videoId }) => {
  useEffect(() => {
    // Function to create the YouTube player
    function createPlayer() {
      new window.YT.Player(`youtube-player-${videoId}`, {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {
          autoplay: 1, // Autoplay the video
          mute: 1, // Mute the video to allow autoplay in some browsers
          controls: 1, // Show player controls
          loop: 1, // Loop the video
          playlist: videoId, // Required for looping
        },
        events: {
          onReady: (event) => {
            event.target.playVideo(); // Play the video when ready
          },
        },
      });
    }

    // Check if the YouTube API script is already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      // If the script is already loaded, initialize the player immediately
      createPlayer();
    }
  }, [videoId]);

  return <div id={`youtube-player-${videoId}`}></div>;
};

export default YouTubeVideo;