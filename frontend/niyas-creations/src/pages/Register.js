import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };


    return (
        <div>

            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder='mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='pass'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>

                <div>

                    <p>
                        Already have an account?
                        <span
                            onClick={() => navigate("/login")}
                            style={{ color: "blue", cursor: "pointer" }}
                        >
                            {" "}Login here
                        </span>
                    </p>

                    <p>
                        Forgot Password?
                        <span
                            onClick={() => navigate("/forgot-password")}
                            style={{ color: "red", cursor: "pointer" }}
                        >
                            {" "}Reset Here
                        </span>
                    </p>

                </div>

            </form>

        </div>
    )
}
