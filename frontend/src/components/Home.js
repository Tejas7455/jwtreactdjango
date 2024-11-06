import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Home() {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://localhost:8000/api/user/", config);
                    setLoggedIn(true);
                    setUsername(response.data.username);
                } else {
                    setLoggedIn(false);
                    setUsername("");
                }
            } catch (error) {
                // Handle token expiration or authorization error
                console.log("Authorization error:", error.response?.data || error.message);
                setLoggedIn(false);
                setUsername("");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
        };
        checkLoggedInUser();
    }, []);

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const accessToken = localStorage.getItem("accessToken");
    
            if (refreshToken && accessToken) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                };
                await axios.post("http://localhost:8000/api/logout/", { "refresh": refreshToken }, config);
                
                // Clear tokens after successful logout
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setLoggedIn(false);
                setUsername("");
                setError(""); // Clear any previous error message
            } else {
                setError("No token found. Please log in.");
            }
        } catch (error) {
            console.log("Failed to logout:", error.response?.data || error.message);
            setError("Logout failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            {isLoggedIn ? (
                <>
                    <h2>Hello, {username}. Thanks for logging in!</h2>
                    <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </>
            ) : (
                <>
                    <h2>Please Login</h2>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </>
            )}
        </div>
    );
}

export default Home;
