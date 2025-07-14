import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import leetcode from '../assets/leetcode.png';
import codeForces from '../assets/codeforces.png';
import Gfg from '../assets/gfg.png';
import HackerRank from '../assets/hackerrank.png'
import codeStudio from '../assets/codeStiudio.png'
import interviewBit from '../assets/interviewBit.png'

const CrossPlatformMatch = () => {
  const { state } = useLocation();
  console.log(state)
  const { name, tags } = state;
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const fetchMatches = async () => {
      if (!name) {
        console.error("No name found in location.state");
        return;
      }
      try {
        const res = await axios.post("http://localhost:3000/api/match/find  ", {
          name, tags
        });
        setMatches(res.data);
      } catch (error) {
        console.error("Failed to fetch matched problems", error);
      }
    };
    fetchMatches();
  }, [name, tags]);

  const handleViewProblem = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const PlatformCard = ({ platform }) => {
    return (
      
      <div className="flex items-center justify-between bg-[#121411] rounded-lg p-6 mb-4">
        <div className="flex-1">
          <div className="text-white text-semibold text-xl mb-1">{platform.platform}</div>
          <h3 className="text-white text-xl font-semibold mb-2">
            {platform.name}
          </h3>

          <button
            onClick={() => handleViewProblem(platform.url)}
            className="flex items-center gap-2 bg-[#293038] hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            View Problem
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div
          className={`w-64 h-32 ${platform.bgColor} rounded-lg flex items-center justify-center ml-8`}
        >
          <div className={`text-center ${platform.textColor || "text-white"}`}>
            {platform.platform === "GFG" && (
              <div className="text-2xl font-bold">
                <img src={Gfg} alt="" />
              </div>
            )}
            {platform.platform === "Codeforces" && (
                <div className="text-2xl font-bold ">
                  <img src={codeForces} alt="" />
                </div>
            )}
            {platform.platform === "HackerRank" && (
              <div className="text-2xl font-bold">
                <img src={HackerRank} alt="" />
              </div>
            )}
            {platform.platform === "LeetCode" && (
              <div className="text-2xl font-bold">
                <img src={leetcode} alt="" />
              </div>
            )}
            {platform.platform === "CodeStudio" && (
              <div className="text-2xl font-bold">
                <img src={codeStudio} alt="" />
              </div>
            )}
            {platform.platform === "InterviewBit" && (
              <div className="text-2xl font-bold">
                <img src={interviewBit} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="min-h-screen bg-[#121417] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">
          Cross-Platform Problem Match
        </h1>

        <div className="space-y-0">
          {matches.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </main>
    </div>
    
    </>
    
  );
};

export default CrossPlatformMatch;
