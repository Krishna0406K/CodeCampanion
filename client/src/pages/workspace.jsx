import React, { useState, useEffect } from 'react';
import {
  Search,
  Monitor,
  BarChart3,
  Code,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CodingProblemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [problem, setProblem] = useState([]);

  const getProblems = async () => {
    await axios
      .get("http://localhost:3000/api/problemSet/problems")
      .then(res => setProblem(res.data))
      .catch(err => console.error("Error fetching problems:", err));
  };

  useEffect(() => {
    getProblems();
  }, []);

  const navigate = useNavigate();

  const goToAIexplainer = (name, tags) => {
    navigate('/problems/explaination', { state: { name, tags } });
  };

  const goToVideoSolutions = (name) => {
    navigate("/problems/videos", {state: {name}});
  };

  const goToPlatforms = (name, tags) => {
    navigate("/problems/platforms", { state: { name, tags } });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'LeetCode': return <Monitor className="w-6 h-6" />;
      case 'HackerRank': return <BarChart3 className="w-6 h-6" />;
      case 'CodeForces': return <Code className="w-6 h-6" />;
      case 'GeeksforGeeks': return <Monitor className="w-6 h-6" />;
      case 'Codility': return <BarChart3 className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  const filteredProblems = problem.filter(p =>
  (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (Array.isArray(p.tags) && p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
);


 
  const problemsPerPage = 6;
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;
  const currentProblems = filteredProblems.slice(startIndex, startIndex + problemsPerPage);

  return (
    <div className="min-h-screen bg-[#121417] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Coding Problems</h1>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems or tags..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
              className="w-full bg-[#292E38] border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-6">
          {currentProblems.map(problems => (
            <div key={problems.contestID} className="bg-[#1C2126] rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">{problems.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {problems.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#292E38] text-gray-300 text-sm rounded-full border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={problems.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-medium"
                  >
                    Solve on Platform
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center text-white shadow-lg">
                    {getPlatformIcon(problems.platform)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => goToAIexplainer(problems.name, problems.tags)}
                  className="bg-[#292E38] hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  AI Solution
                </button>
                <button
                  onClick={() => goToPlatforms(problems.name, problems.tags)}
                  className="bg-[#292E38] hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Other Platforms
                </button>
                <button
                  onClick={() => goToVideoSolutions(problems.name)}
                  className="bg-[#292E38] hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  YouTube Video Solutions
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-[#292E38] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'bg-[#292E38] hover:bg-gray-700 text-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-[#292E38] hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No problems found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodingProblemsPage;
