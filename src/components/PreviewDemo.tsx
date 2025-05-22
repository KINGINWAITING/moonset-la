
import React from 'react';
import { Preview } from "@/components/ui/preview";
import { useTheme } from "@/context/ThemeContext";

export const PreviewDemo = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-8">
      <Preview 
        title="Content Preview" 
        isOpen={true}
      >
        <div className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
          <h3 className="text-xl font-bold mb-2">Sample Content</h3>
          <p className="text-muted-foreground">
            This is an example of content that can be shown in a preview component.
            It can be used for showing snippets of articles, code examples, or other content
            that users might want to see before clicking through.
          </p>
        </div>
      </Preview>
      
      <Preview 
        title="Code Example"
      >
        <pre className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"} overflow-x-auto`}>
          <code>
            {`function hello() {
  console.log("Hello, world!");
}

// Call the function
hello();`}
          </code>
        </pre>
      </Preview>
      
      <Preview 
        title="Image Preview"
        contentClassName="p-0"
      >
        <img
          src="/lovable-uploads/63041e81-616a-4f1e-8faf-7cc9a2b3da0e.png"
          alt="Preview example"
          className="w-full h-auto"
        />
      </Preview>
    </div>
  );
};

export default PreviewDemo;
