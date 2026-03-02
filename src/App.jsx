import './App.css';
import HomePage from './pages/HomePage/homepage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomeScreen />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
