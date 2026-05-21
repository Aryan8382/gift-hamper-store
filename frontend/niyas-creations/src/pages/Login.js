import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://localhost:5000/api/users/login',
                { email, password }
            );

            // Store token
            localStorage.setItem('token', response.data.token);

            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );
            alert("Login Successful");

            // Navigate after login
            navigate('/Homepage');

        } catch (error) {

            console.error('Error logging in:', error);

            alert("Invalid Email or Password");
        }
    };

    return (
        <div>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email:</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>

                    <label>Password:</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}