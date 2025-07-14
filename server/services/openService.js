
import axios from "axios";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = "llama3-8b-8192"; 
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";


export const generateAIExplanation = async (name, tags = [], platform = "Codeforces") => {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY not set in environment");

  const tagLine = tags.length > 0 ? `Tags: ${tags.join(", ")}` : "";

  const prompt = `
You are a helpful AI programming assistant. Please explain the following problem from ${platform} in a beginner-friendly way.

Problem Title: ${name}
${tagLine}

Include:
1. Problem Understanding  
2. Step-by-Step Logic  
3. Dry Run Example  
4. Pseudocode  
5. Optimized Code in C++, Python, JavaScript, and Java  
6. Final Thoughts
`;

  try {
    const { data } = await axios.post(
      GROQ_URL,
      {
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data?.choices?.[0]?.message?.content || "No response from AI model.";
  } catch (error) {
    const errMsg = error?.response?.data?.error?.message || error.message;
    console.error("GROQ API Error:", errMsg);
    throw new Error("Groq AI failed to generate explanation");
  }
};
