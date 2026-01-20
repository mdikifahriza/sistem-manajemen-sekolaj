
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Could not find root element with id 'root'. Check your index.html.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render the app:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; color: #1e293b; font-family: 'Inter', sans-serif; text-align: center; max-width: 500px; margin: 100px auto; background: white; border-radius: 24px; shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
        <h1 style="color: #ef4444; margin-bottom: 16px;">Aplikasi Gagal Dimuat</h1>
        <p style="margin-bottom: 24px; color: #64748b;">Terjadi kesalahan saat memulai sistem. Silakan periksa koneksi internet atau konsol browser.</p>
        <pre style="background: #f1f5f9; padding: 16px; border-radius: 12px; font-size: 12px; overflow-x: auto; text-align: left;">${error instanceof Error ? error.message : String(error)}</pre>
        <button onclick="window.location.reload()" style="margin-top: 24px; padding: 12px 24px; background: #059669; color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: bold;">Coba Segarkan</button>
      </div>
    `;
  }
}

// Catch unhandled promise rejections (like Supabase connection failures)
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection (promise):', event.reason);
});
