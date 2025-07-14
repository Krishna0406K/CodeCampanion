import axios from "axios";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama3-8b-8192"; 

export const findMatchingProblem = async (name) => {
  const prompt = `
You are an AI assistant. Given a problem titled: "${name}", return a **strict JSON array only** containing matching problems across platforms like LeetCode, GFG, Codeforces, CodeStudio, HackerRank, and InterviewBit.

Each item must include: 
- "platform" (string)
- "title" (string)
- "url" (string)

⚠️ Output only the JSON array. No explanation or surrounding text.

Example:
[
  { "platform": "LeetCode", "title": "Two Sum", "url": "https://leetcode.com/problems/two-sum" },
  { "platform": "Codeforces", "title": "Watermelon", "url": "https://codeforces.com/problemset/problem/4/A" }
]
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GROQ API Error:", error?.response?.data || error.message);
    throw new Error("Failed to generate explanation from Groq");
  }
};