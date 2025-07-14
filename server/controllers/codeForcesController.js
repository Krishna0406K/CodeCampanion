import axios from 'axios'

let cachedProblems = null;

export const getCodeforcesProblems = async (req, res) => {
  try {
    if (cachedProblems) return res.json(cachedProblems);

    const response = await axios.get("https://codeforces.com/api/problemset.problems");

    const allProblems = response.data.result.problems;

    const formatted = allProblems.slice(0, 150).map((p) => ({
      contestId: p.contestId,
      name: p.name,
      tags: p.tags,
      url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
    }));

    cachedProblems = formatted; 
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching Codeforces problems:", err.message);
    res.status(500).json({ message: "Failed to fetch Codeforces problems" });
  }
};
