import { useState } from 'react';
import css from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [strength, setStrength] = useState('');
    
    const getStrength = (pwd) =>{
        if(!pwd) return '';
        const score = [
            pwd.length>=8,
            /[a-z]/.test(pwd),
            /[A-Z]/.test(pwd),
            /[0-9]/.test(pwd)
        ].filter(Boolean).length;
        return score <=2 ? 'Weak': score === 3 ? 'Normal' : 'Strong';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form,[name]:value});
        if(name === 'password') setStrength(getStrength(value));
        // setForm({...form, [e.target.name]: e.target.value,});
    }

    const validation =()=>{
        let newErrors = {};
        if(!form.email.trim()){
            newErrors.email = "Email is required";
        } else if(!/\S+@\S+\.\S+/.test(form.email)){
            newErrors.email = "Please enter valid email";
        } 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if(!passwordRegex.test(form.password)){
            newErrors.password = "Password must be at least 8 characters and contain uppercase, lowercase, and number";
        }
        
        return newErrors;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        

        const validationErrors = validation()
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length===0){
            
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                name: form.email.split('@')[0],
                email: form.email
            }))
            navigate('/home');
        }
    }

    
    return (
        <div className={css.loginWrapper}>
            <div className={css.authContainer}>
                <h2>Login</h2>
                <form className={css.authForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email&&<p>{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password&&<p>{errors.password}</p>}
                 {strength && <p style={{color: strength === 'Weak' ? '#ef4444' : strength === 'Normal' ? '#f59e0b' : '#10b981',}}>
                        Password Strength: {strength}
                    </p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage