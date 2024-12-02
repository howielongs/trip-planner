import React, { useState, useEffect } from 'react';
import { googleSignIn, googleSignOut } from '../firebase';  // Import Firebase auth functions
import '../styles/Login.css';  // Import custom styles for login page

const Login = ({ onUserChange }) => {
  const [user, setUser] = useState(null); // Store user info

  // Notify App component when user state changes
  useEffect(() => {
    if (onUserChange) {
      onUserChange(user); 
    }
  }, [user, onUserChange]);

  const handleUserLogin = async (user) => {
    console.log(user);
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: user.displayName,
                email: user.email,
            }),
        });
        console.log(response);
        const data = await response.json();
        if (response.ok) {
            console.log('User added or found:', data);
            setUser(data.user); // Save user info after successful login
        } else {
            console.error('Error from server:', data.error);
        }
    } catch (error) {
        console.error('Error adding/finding user:', error);
    }
};

//after good login
const handleSignIn = async () => {
    try {
        const result = await googleSignIn(); // Call the Firebase sign-in function
        handleUserLogin(result.user); // Add or find the user in the database

    } catch (error) {
        console.error('Error signing in:', error);
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
