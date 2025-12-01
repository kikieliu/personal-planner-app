import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import './index.css'; // Import global CSS styles
import App from './App'; // Import the main App component

// Create a root element for React to attach to
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app into the root element
root.render(
  React.createElement(
    React.StrictMode, // StrictMode helps identify potential problems in the app
    null,
    React.createElement(App) // Render the main App component
  )
);
