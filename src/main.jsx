import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";

// Google Client ID from your backend .env
const GOOGLE_CLIENT_ID = "3155247895-4udf5i8eov1j3jg6hohhg9n7gd16ebtf.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
