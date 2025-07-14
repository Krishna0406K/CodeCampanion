import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const YouTubeVideoTutorials = () => {

    const { state } = useLocation();
  console.log(state)
  const { name} = state;
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      if (!name) {
        console.error("No name found in location.state");
        return;
      }
      try {
        const res = await axios.post("http://localhost:3000/api/youtube/search  ", {
          name
        });
        setVideos(res.data.videos);
      } catch (error) {
        console.error("Failed to fetch matched problems", error);
      }
    };
    fetchVideos();
  }, [name]);

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const VideoCard = ({ video }) => {
    const renderThumbnail = () => {
      switch (video.thumbnailType) {
        case 'code':
          return (
            <div className={`w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg`}>
              <div className="bg-white/20 p-4 rounded">
                <div className="w-16 h-12 bg-white/30 rounded mb-2"></div>
                <div className="space-y-1">
                  <div className="w-12 h-1 bg-white/50 rounded"></div>
                  <div className="w-10 h-1 bg-white/50 rounded"></div>
                  <div className="w-14 h-1 bg-white/50 rounded"></div>
                </div>
              </div>
            </div>
          );
        case 'code-dark':
          return (
            <div className={`w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20">
                <div className="text-green-400 text-xs font-mono p-2 leading-tight">
                  {'<html>\n  <head>\n    <title>JS</title>\n  </head>\n  <body>\n    <script>\n      console.log("Hello");\n    </script>\n  </body>\n</html>'}
                </div>
              </div>
            </div>
          );
        case 'mobile':
          return (
            <div className={`w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg`}>
              <div className="bg-white rounded-lg p-2 shadow-lg">
                <div className="w-16 h-24 bg-gray-100 rounded border-2 border-gray-300 relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          );
        case 'nodejs':
          return (
            <div className={`w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg`}>
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-1">{video.logoText}</div>
                <div className="w-8 h-8 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
              </div>
            </div>
          );
        case 'landscape':
          return (
            <div className={`w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg`}>
              <div className="w-20 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <div className="text-white text-xs">🏔️</div>
              </div>
            </div>
          );
        case 'books':
          return (
            <div className={`w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg`}>
              <div className="relative">
                <div className="w-8 h-10 bg-white rounded-sm shadow-lg"></div>
                <div className="absolute -top-1 -right-1 w-6 h-8 bg-gray-200 rounded-sm shadow-md"></div>
                <div className="absolute top-2 -right-2 w-4 h-6 bg-gray-100 rounded-sm shadow-sm"></div>
              </div>
            </div>
          );
        default:
          return (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="w-full h-full ${video.bgColor} flex items-center justify-center rounded-lg"><span class="text-white">📹</span></div>`;
              }}
            />
          );
      }
    };

    return (
      
      <div 
        className="cursor-pointer group"
        onClick={() => handleVideoClick(video.videoUrl)}
      >
        <div className="bg-[#293038] rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-200">
          {/* Thumbnail */}
          <div className="aspect-video w-full">
            {renderThumbnail()}
          </div>
          
          {/* Video Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-300 transition-colors">
              {video.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {video.channel}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#121417] text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">YouTube Video Tutorials</h1>
        
        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default YouTubeVideoTutorials;