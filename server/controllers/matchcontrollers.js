import { findMatchingProblem } from "../services/matchService.js";

export const getCrossPLatformMatches = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name (problemTitle) is required" });
  }

  try {
    const results = await findMatchingProblem(name);

    const parsed = typeof results === "string" ? JSON.parse(results) : results;

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }

    return res.status(200).json(parsed); 
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch the cross platforms result" });
  }
};
