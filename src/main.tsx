// Import polyfills first to ensure globals are available
import './polyfills';

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StagewiseToolbar } from '@stagewise/toolbar-react'

// Simple initialization to avoid potential timeout issues
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);

// Stagewise Toolbar Integration (development only)
if (import.meta.env.MODE === 'development') {
  let toolbarRoot = document.getElementById('stagewise-toolbar-root');
  if (!toolbarRoot) {
    toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root';
    document.body.appendChild(toolbarRoot);
  }
  const stagewiseConfig = { plugins: [] };
  createRoot(toolbarRoot).render(<StagewiseToolbar config={stagewiseConfig} />);
}
