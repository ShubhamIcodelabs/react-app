import './App.css';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import Layout from './components/Layout/Layout.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavouritePage from './pages/FavouritePage/FavouritePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without header */}
        <Route path='/' element={<WelcomeScreen />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        
        {/* Routes with header (wrapped in Layout) */}
        <Route element={<Layout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/favourite" element={<FavouritePage/>} /> 
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/not-found" element={<NotFound />} />
        </Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
