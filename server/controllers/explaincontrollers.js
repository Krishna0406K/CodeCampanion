import { generateAIExplanation } from "../services/openService.js";

export const getAISolution = async (req, res) => {
  try {
    const { name, tags = [], platform = "Codeforces" } = req.body;

    const aiSolution = await generateAIExplanation(name, tags, platform);
    res.status(200).json({ solution: aiSolution });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



