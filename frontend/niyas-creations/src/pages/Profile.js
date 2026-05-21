import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {

    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await axios.get(
                    'http://localhost:5000/api/users/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(res.data);

            } catch (error) {
                console.log(error.response?.data || error.message);
            }

        };

        fetchProfile();

    }, []);

    return (

        <div style={{ padding: '30px' }}>

            <h1>My Profile</h1>

            {
                user ? (

                    <div style={{
                        border: '1px solid #ccc',
                        padding: '20px',
                        width: '300px',
                        borderRadius: '10px'
                    }}>

                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>

                    </div>

                ) : (

                    <p>Loading profile...</p>
                )
            }

        </div>
    );
}