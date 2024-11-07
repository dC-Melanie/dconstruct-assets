import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/home');
    }

    return (
        <div style={{
            height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',position: 'relative',
            overflow: 'hidden',
        }}>
            <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensures the video covers the entire container without distortion
                    zIndex: -1, // Pushes the video behind the content
                }}
            >
                <source src="https://video.wixstatic.com/video/d68b4f_d8c6019e27b44b9cac47556bccf93485/1080p/mp4/file.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            <div className="container" style={{ width: '100%', maxWidth: "500px", padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#d3d3d3', opacity: '90%' }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>

    );
}

export default LoginPage;