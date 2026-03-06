import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from "../../components/HeroSection/HeroSection"
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection"
import HowItWorkSection from "../../components/HowItWorkSection/HowItWorkSection"
import css from './HomePage.module.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const currentUser = localStorage.getItem('currentUser');
        
        if (!isAuthenticated || isAuthenticated !== 'true') {
            navigate('/');
            return;
        }
        
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    if (!user) {
        return <div className="loader"></div>;
    }

    return (
        <div>
            <header className={css.header}>
                <h1>Welcome, {user.name}!</h1>
                <button 
                    onClick={handleLogout}
                    className={css.logoutBtn}>
                    Logout
                </button>
            </header>
            <HeroSection />
            <AboutUsSection />
        </div>
    )
}

export default HomePage;