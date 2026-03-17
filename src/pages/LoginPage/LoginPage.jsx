import { useState } from 'react';
import css from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const API_BASE_URL = "http://localhost:3001/api";

const LoginPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message,setMessage] = useState('');
    const [type, setType] = useState("");
    console.log(message,"message")
    const [isLoading, setIsLoading] = useState(false);

    // const [strength, setStrength] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }

        if (message) {
            setMessage('');
        }
    };

    const validateForm =()=>{
        let newErrors = {};

        if(!form.email.trim()){
            newErrors.email = "Email is required";
        } else if(!EMAIL_REGEX.test(form.email)){
            newErrors.email = "Please enter valid email";
        } 
        
        if (!form.password) {
            newErrors.password = "Password is required";
        }
        
        return newErrors;
    }

    const loginAPI = async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            return data;
        } catch (error) {
            if (error.message === "Failed to fetch") {
                throw new Error('Cannot connect to server. Please check if backend is running.');
            }
            throw error;
        }
    };

    const saveSession = ({ accessToken, refreshToken, user }) => {
        console.log('Saving session:', { accessToken: !!accessToken, refreshToken: !!refreshToken, user: !!user });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Session saved, localStorage check:', {
            accessToken: !!localStorage.getItem('accessToken'),
            refreshToken: !!localStorage.getItem('refreshToken'),
            isAuthenticated: localStorage.getItem('isAuthenticated')
        });
    };

    const handleSubmit = async (e) => {
        //api.get('/users')
        e.preventDefault();

        if (isLoading) return;

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            const loginData = {
                email: form.email.trim(),
                password: form.password
            };

            const response = await loginAPI(loginData);
            console.log('Login API response:', response);
            
            // Save session with tokens and user data
            saveSession(response);
            
            setType("success");
            setMessage("Login successful! Redirecting...");

            // Small delay to ensure localStorage is updated before navigation
            setTimeout(() => {
                console.log('Navigating to /home');
                navigate('/home', { replace: true });
            }, 100);

        } catch (error) {
            setType("error");
            if (error.message === 'Failed to fetch') {
                setMessage('Cannot connect to server. Please try again later.');
            } else {
                setMessage(error.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = 
    form.email.trim() !== ''&& form.password.trim() !== '';

    // Google Login API call
    const googleLoginAPI = async (googleToken) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ googleToken })
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Google login failed");
            }
            return data;
        } catch (error) {
            if (error.message === "Failed to fetch") {
                throw new Error('Cannot connect to server. Please check if backend is running.');
            }
            throw error;
        }
    };

    // Handle Google Login Success
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setIsLoading(true);
            setMessage('');
            
            console.log('Google credential response:', credentialResponse);
            
            // Decode the JWT token to get user info
            const userInfo = jwtDecode(credentialResponse.credential);
            console.log('Decoded user info:', userInfo);

            // Send the Google token to your backend
            const response = await googleLoginAPI(credentialResponse.credential);
            console.log('Google login API response:', response);
            
            // Save session with tokens and user data
            saveSession(response);
            
            setType("success");
            setMessage("Google login successful! Redirecting...");

            // Navigate to home
            setTimeout(() => {
                console.log('Navigating to /home after Google login');
                navigate('/home', { replace: true });
            }, 100);

        } catch (error) {
            console.error('Google login error:', error);
            setType("error");
            setMessage(error.message || 'Google login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google Login Error
    const handleGoogleError = () => {
        console.log("Google Login Failed");
        setType("error");
        setMessage("Google login failed. Please try again.");
    };

    return (
        <div className={css.loginWrapper}>
            <div className={css.authContainer}>
                <h2>Login</h2>
                {message && <div className={`${css.alert} ${type === "error" ? css.error : css.success}`}>{message}</div>}
                <form className={css.authForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email&&<p className={css.errorMessage}>{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password&&<p className={css.errorMessage}>{errors.password}</p>}
                    {/* {strength && 
                        <p style={{color: strength === 'Weak' ? '#ef4444' : strength === 'Normal' ? '#f59e0b' : '#10b981',}}>
                            Password Strength: {strength}
                        </p>
                    } */}
                    <button 
                        type="submit"
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                {/* Divider */}
                <div className={css.divider}>
                    <span>OR</span>
                </div>
                
                {/* Google Login Button */}
                <div className={css.googleLoginContainer}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap={false}
                        theme="outline"
                        size="large"
                        text="signin_with"
                        shape="rectangular"
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage