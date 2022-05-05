import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ThreeJSScreen from "./ThreeJsScreen.js";

const TestPage = () => {
  const { id } = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    fetchText();
  }, [id]);

  const fetchText = async () => {
    try {
      const response = await fetch(`/api/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const json = await response.json();
      setText(json.text);
    } catch (error) {
      console.error(`Error in fetch: ${error}`);
    }
  };

  return (
    <div className="page">
      <h5>ThreeJS</h5>
      <ThreeJSScreen width={800} height={600}/>
    </div>
  );
};

export default TestPage;
