import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  platform: String,
  problemId: String,
  title: String,
  description: String,
  difficulty: String,
  aiExplanation: String,
  problemURL: String,
  youtubeVideos: [
    {
      title: String,
      url: String,
      channel: String,
      thumbnail: String
    }
  ],
  crossPlatformMatches: {
    leetcode: String,
    geeksForGeeks: String,
    codeForces: String,
    codeStudio: String,
    hackerRank: String,
    interviewBit: String,
  },
  createdAt: Date
})

const problem = mongoose.model('Problem', problemSchema);
export default problem;