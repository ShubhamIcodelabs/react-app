import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from "../../components/HeroSection/HeroSection"
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection"
import HowItWorkSection from "../../components/HowItWorkSection/HowItWorkSection"

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header style={{ 
                background: '#667eea', 
                color: 'white', 
                padding: '1rem 2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                <h1>Welcome, {user.name}!</h1>
                <button 
                    onClick={handleLogout}
                    style={{
                        background: 'white',
                        color: '#667eea',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
            </header>
            <HeroSection />
            <AboutUsSection />
        </div>
    )
}

export default HomePage;