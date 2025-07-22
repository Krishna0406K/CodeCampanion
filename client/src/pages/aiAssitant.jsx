    import { useLocation } from "react-router-dom";
    import axios from "axios";
    import { useEffect, useState } from "react";
    import { useCallback } from "react";

    const AIExplainer = () => {
      const { state } = useLocation();
      const { name, tags } = state;

      const [solution, setSolution] = useState("");
      const [loading, setLoading] = useState(false);

      

      const getSolution = useCallback(async () => {
        setLoading(true);
        try {
          const res = await axios.post("https://codecampanion.onrender.com", {
            name,
            tags,
            platform: "Codeforces"
          });
          setSolution(res.data.solution);
        } catch (err) {
          console.error("Error fetching solution:", err);
        }
        setLoading(false);
      }, [name, tags]);

      useEffect(() => {
        getSolution();
      }, [getSolution]);

      return (
        <>
        <div className="min-h-screen bg-[#121417] text-white px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{name}</h1>

            {loading ? (
              <p className="text-teal-300">Generating AI Solution...</p>
            ) : (
              <pre className="whitespace-pre-wrap bg-[#1e1e2f] p-6 rounded-lg leading-loose">
                {solution}
              </pre>
            )}
          </div>
        </div>
        </>
      );
    };

    export default AIExplainer;
