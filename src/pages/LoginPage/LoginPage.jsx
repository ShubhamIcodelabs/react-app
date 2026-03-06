import { useState } from 'react';
import css from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message,setMessage] = useState('');
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

    const findUser = (email, password) => {
        try {
            const usersData = localStorage.getItem('users');

            if (!usersData) {
                return null;
            }

            const users = JSON.parse(usersData);
            return users.find (
                user => user.email === email && user.password === password
            );
        } catch (error) {
            console.error("Error finding user:", error);
            return null;
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
            await new Promise(resolve => setTimeout(resolve, 500));

            const user = findUser(form.email, form.password);
            
            if (!user) {
                setMessage('Invalid email and password');
                setIsLoading(false);
                return;
            } 
            setAuthentication(user);

            navigate('/home');
        } catch (error) {
            setMessage(error.message || 'Something went wrong. Please try again');
            setIsLoading(false);
        }
    };

    const isFormValid = 
    form.email.trim() !== ''&& form.password.trim() !== '';

    
    return (
        <div className={css.loginWrapper}>
            <div className={css.authContainer}>
                <h2>Login</h2>
                {message && <div>{message}</div>}
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