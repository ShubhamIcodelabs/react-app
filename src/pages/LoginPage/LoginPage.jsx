import { useState } from 'react';
import css from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { userData } from 'three/tsl';

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
            ...form,
            [name]:value
        }));

        // if(name === 'password') setStrength(getStrength(value));
        // setForm({...form, [e.target.name]: e.target.value,});
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
            const response = await fetch(`${API_BASE_URL}/user/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message, "Login failed")
        }
        return data;
        } catch (error){
            if (error.message === "Failed to fetch") {
                throw new Error('Connot connect to server. Please check if backend is running.')
            }
            throw error;
        }
    };

    

    const setAuthentication = (user) => {
        try {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            }));
            return true;
        } catch (error) {
            console.error("Error setting authentication", error);
            throw new Error("Failed to save login session");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        
        const validationErrors = validateForm()
        // setErrors(validationErrors);

        if(Object.keys(validationErrors).length> 0){
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
            setType("success");

            setAuthentication(response.user);

            navigate('/home');

        } catch (error) {
            setMessage(error.message || 'Something went wrong. Please try again');
            setType("error")
            setIsLoading(false);
        }
    };

    const isFormValid = 
    form.email.trim() !== ''&& form.password.trim() !== '';

    
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage