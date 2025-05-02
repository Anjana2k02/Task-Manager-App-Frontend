import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            const { id, type } = res.data;

            localStorage.setItem('userId', id);
            localStorage.setItem('userType', type);

            navigate('/dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };



    

    return (
        <div>
            <h2>Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default UserLogin;
