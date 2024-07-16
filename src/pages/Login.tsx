import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import "./../styles/Login.scss"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../api/baseapi";

interface LoginData {
    email: string;
    password: string;
  }

const Login: React.FC = () => {
    const [loginData,setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name , value} = e.target;
        setLoginData({...loginData, [name]:value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
          const response = await axios.post(`${base_url}/user/login`, loginData);
          if (response.status === 200) {
            localStorage.setItem('token', response.data.id);
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('email', response.data.email);
            toast.success("User logged Successfully!", { position: 'top-center' })
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Login failed:', error);
          toast.error('Invalid Credentials. Please try again later', { position: 'top-center' });
        }
      };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="above-form">
                    <h2 id='head-section'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input className="login-input" type="text" id="email" name="email" placeholder="Enter your email" value={loginData.email} onChange={handleChange} required/>
                    </div>
                    <div className="input-group">
                        <input className="login-input" type="password" id="password" name="password"  placeholder="Password" value={loginData.password} onChange={handleChange} required/>
                    </div>
                    <div id='forgot'> 
                    <a className='nextlink' href="">Forgot Password?</a></div>
                    <div className='bottom-container'>
                    <div className="links">
                        <a className='nextlink' href="/register">Create Account</a>
                    </div>
                    <button id="submit-button" type="submit">Login</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;