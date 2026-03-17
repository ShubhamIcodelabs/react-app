import { useState } from 'react';
import css from './SignupPage.module.css'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const MIN_NAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 8; // Restored to 8 for strong passwords
const REDIRECT_DELAY = 2000;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/; // Strong password validation
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const API_BASE_URL = "http://localhost:3001/api";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    if (!password) return "";
    
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    if (strength < 3) return "Weak";
    if (strength < 5) return "Medium";
    return "Strong";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength in real-time
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    if (message) {
      setMessage("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < MIN_NAME_LENGTH) {
      newErrors.name = `Name must be at least ${MIN_NAME_LENGTH} characters`;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    } else if (!PASSWORD_REGEX.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please conform your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match"
    }

    return newErrors;
  };

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
        throw new Error('Cannot connect to server. Please try again later.');
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
      
      // Save session data
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      setType("success");
      setMessage("Google login successful! Redirecting...");

      // Navigate to home
      setTimeout(() => {
        navigate('/home');
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

  const loginAfterSignup = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Auto-login failed");
      }
      
      // Save session data
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return data;
    } catch (error) {
      console.error('Auto-login failed:', error);
      throw error;
    }
  };
  const signupAPI = async (userData) => {
    console.log('userData', userData)
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      console.log('data', data, response)
      
      if(!response.ok) {
        throw new Error(data.message || "Signup failed");
      } 
      return data;

    } catch (error) {
      console.log('error', error)

      if (error.message === "Failed to fetch") {
        throw new Error('Cannot connect to server. please try again later.');
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    // Validate form
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare user data for api
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      // Save user
      const signupResponse = await signupAPI(userData);

      // Show success message
      setMessage("Signup successful! Logging you in...");
      setType("success");

      try {
        // Auto-login after successful signup
        await loginAfterSignup(userData.email, userData.password);
        
        // Navigate directly to home
        navigate('/home');
        
      } catch (loginError) {
        // If auto-login fails, redirect to login page
        setMessage("Signup successful! Please login to continue.");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
      setType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if all fields are filled
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "";

  return (
    <div className={css.signupWrapper}>
      <div className={css.authContainer}>
        <h2>Sign Up</h2>
        {message && <div className={`${css.alert} ${type === "error" ? css.error : css.success}`}>{message}</div>}
        <form className={css.authForm} onSubmit={handleSubmit} noValidate>
          <div className={css.formGroup}>
            <input
              type="text"
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              disabled={isLoading}
            />
            {errors.name && 
              <span className={css.errorText} role="alert">
                {errors.name}
              </span>
            }
          </div>
          <div className={css.formGroup}>
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={isLoading}
            />
            {errors.email && 
              <span className={css.errorText} role="alert">
                {errors.email}
              </span>
            }
          </div>
          <div className={css.formGroup}>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (8+ chars, uppercase, lowercase, number, special char)"
            />
            {passwordStrength && (
              <div className={css.passwordStrength}>
                <span style={{
                  color: passwordStrength === 'Weak' ? '#ef4444' : 
                         passwordStrength === 'Medium' ? '#f59e0b' : '#10b981',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Password Strength: {passwordStrength}
                </span>
              </div>
            )}
            {errors.password && 
              <span className={css.errorText} role="alert">
                {errors.password}
              </span>
            }
          </div>
          <div className={css.formGroup}>
            <input
              type="password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && 
              <span className={css.errorText} role="alert">
                {errors.confirmPassword}
              </span>
            }
          </div>
          <button 
            type="submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
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
            text="signup_with"
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  )
}

export default SignupPage;