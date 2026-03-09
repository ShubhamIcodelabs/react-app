import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from "../../components/HeroSection/HeroSection"
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection"

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

    if (!user) {
        return <div className="loader"></div>;
    }

    return (
        <div>
            <HeroSection />
            <AboutUsSection />
        </div>
    )
}

export default HomePage;