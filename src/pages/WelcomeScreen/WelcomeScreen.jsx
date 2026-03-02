import React from 'react';
import { Link } from 'react-router-dom';
import css from './WelcomeScreen.module.css';

function WelcomeScreen() {
  return (
    <div className={css.welcomeContainer}>
      <div className={css.welcomeContent}>
        <h1>Welcome to Our App</h1>
        <p>Get started by creating an account or logging in</p>
        <div className={css.buttonContainer}>
          <Link to="/signup" className={css.signupBtn}>
            Sign Up
          </Link>
          <Link to="/login" className={css.loginBtn}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen;