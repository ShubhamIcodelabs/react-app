import { useState } from 'react';
import css from './SignupPage.module.css'
import { useNavigate } from 'react-router-dom';

const MIN_NAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 8;
const REDIRECT_DELAY = 2000;
const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
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
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please conform your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match"
    }

    return newErrors;
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
        password: formData.password, // In production, hash this on backend
      };

      // Save user
      const response = await signupAPI(userData);

      // Show success message
      setMessage(response.message || "Signup successful! Redirecting to login...");
      setType("success");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      // Redirect after delay
      setTimeout(() => {
        navigate('/login');
      }, REDIRECT_DELAY);

    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
      setType("error");
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
              placeholder="Password"
            />
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;