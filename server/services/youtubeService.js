import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const getYoutubeVideos = async (name) => {
    try {
        
        const encodedQuery = encodeURIComponent(name + ' coding solutions');
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodedQuery}&part=snippet&type=video&maxResults=10`;
        
        const searchRes = await axios.get(searchUrl);
        const videoIds = searchRes.data.items.map(item => item.id.videoId).join(',');
        
       
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`;
        
        const videosRes = await axios.get(videosUrl);
        
        return videosRes.data.items.map((video) => ({
            title: video.snippet.title,
            channel: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${video.id}`, 
            description: video.snippet.description,
            publishedAt: video.snippet.publishedAt,
            duration: video.contentDetails.duration,
            viewCount: video.statistics.viewCount,
            likeCount: video.statistics.likeCount
        }));
    } catch (error) {
        console.error('YouTube API Error:', error.response?.data || error.message);
        throw error;
    }
};