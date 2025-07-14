import {getYoutubeVideos} from '../services/youtubeService.js'

export const fetchVideoSolutions = async (req, res) => {
    console.log("Request body:", req.body);
    const {name} = req.body;

    if(!name){
        console.log("No query provided");
        return res.status(400).json({message: "Search query is required"})
    }
    try {
        console.log("Searching for:", name);
        const videos = await getYoutubeVideos(name);
        res.status(200).json({videos});
    } catch (error) {
        console.log("Youtube fetch error:", error); 
        console.log("Error details:", error.response?.data);
        res.status(500).json({message: "Failed to fetch videos"})  
    }
}