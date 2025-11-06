
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Get the root container
const container = document.getElementById("root")!;
const root = createRoot(container);

// Render the app with React StrictMode and SpeedInsights
// SpeedInsights loads asynchronously to not block render
try {
  root.render(
    <React.StrictMode>
      <App />
      <SpeedInsights />
    </React.StrictMode>
  );
} catch (error) {
  console.error('❌ Failed to render app:', error);
  // Render a basic error message if app fails to render
  root.render(
    <div style={{ padding: '2rem', fontFamily: 'system-ui', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Application Error</h1>
      <p style={{ marginBottom: '1rem' }}>Failed to load the application. Please check the console for details.</p>
      <details style={{ marginTop: '1rem', textAlign: 'left', background: '#f5f5f5', padding: '1rem', borderRadius: '4px', maxWidth: '600px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
        <pre style={{ marginTop: '0.5rem', fontSize: '0.875rem', overflow: 'auto' }}>
          {error instanceof Error ? error.message : String(error)}
          {error instanceof Error && error.stack && (
            <>
              {'\n\n'}
              {error.stack}
            </>
          )}
        </pre>
      </details>
    </div>
  );
}

// Performance monitoring
if ('performance' in window && 'measure' in window.performance) {
  window.addEventListener('load', () => {
    performance.mark('app-loaded');
  });
}
