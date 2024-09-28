import React, { useState } from 'react';
import { googleSignIn, googleSignOut } from '../firebase';  // Import Firebase auth functions
import '../styles/Login.css';  // Import custom styles for login page

const Login = () => {
  const [user, setUser] = useState(null);  // Store user info

  const handleSignIn = async () => {
    try {
      const result = await googleSignIn();  // Call the Firebase sign-in function
      setUser(result.user);  // Save user info after successful login
    } catch (error) {
      console.error("Error signing in:", error);  // Log any errors
    }
  };

  const handleSignOut = async () => {
    try {
      await googleSignOut();  // Call the Firebase sign-out function
      setUser(null);  // Clear user info after logout
    } catch (error) {
      console.error("Error signing out:", error);  // Log any errors
    }
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="user-info">
          <img src={user.photoURL} alt="User profile" className="user-image" />
          <h2>Welcome, {user.displayName}</h2>
          <p>{user.email}</p>
          <button className="auth-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="login-box">
          <h1>Sign in to Trip Planner</h1>
          <button className="auth-button" onClick={handleSignIn}>
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google logo"
              className="google-logo"
            />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
