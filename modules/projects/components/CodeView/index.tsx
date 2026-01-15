import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json"; 
import "prismjs/components/prism-css";
import "./code-theme.css"; 

interface CodeViewProps {
  code: string;
  lang?: string; 
}

export const CodeView = ({ 
  code, 
  lang = "javascript" 
}: CodeViewProps) => { 

  useEffect(() => {
    if (code) {
      Prism.highlightAll();
    }
  }, [code, lang]);

  return (
    <pre className="p-2 bg-transparent border-none rounded-lg m-0 text-xs overflow-x-auto">
      <code className={`language-${lang}`}>{code}</code>
    </pre>
  );
};