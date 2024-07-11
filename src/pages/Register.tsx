import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import './../styles/Register.scss';
import register from './../assets/images/register.png';
import base_url from '../api/baseapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    service: string;
    confirmPassword: string;
  }

const Register: React.FC = () => {
    const [formData,setFormData] = useState<RegisterState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        service: "advance",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const validatePassword = (password: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const {firstName, lastName, email, password, confirmPassword} = formData;

        try {
        if (firstName.trim() === '') {
            toast.error('Please enter your first name.', { position: 'top-center' });
            return;
          }
          if (lastName.trim() === '') {
            toast.error('Please enter your last name.', { position: 'top-center' });
            return;
          }
          if (!validateEmail(email)) {
            toast.error('Please enter a valid email address.', { position: 'top-center' });
            return;
          }
          if (!validatePassword(password)) {
            toast.error('Please enter a valid password (Minimum 8 characters with a mix of letters, numbers & symbols).', { position: 'top-center' });
            return;
          }
          if (password !== confirmPassword) {
            toast.error('Confirm password does not match. Please enter the same password in both fields.', { position: 'top-center' });
            return;
          }
          console.log("formData",formData);
          const response = await axios.post(`${base_url}/user/userSignUp`, formData);
          console.log("token",response);
          toast.success("User  registered!", { position: "top-center" });
        } catch (error: any) {
          console.error("Error:", error.message);
          toast.error(error.message, { position: 'top-center' });
        }
    }
    
    return (
        <div className="register-container">
            <div className="form-container">
                <div className='form-content'>
                <h1>Create your Account</h1>
                <form> 
                    <div className="name-container">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName}  onChange={handleChange} required />
                    </div>
                    <input type="text" name="email" placeholder="Enter your email" value={formData.email}  onChange={handleChange} required />
                <small>you can use letters, numbers & periods</small>
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <small>Use 8 or more characters with a mix of letters, numbers & symbols</small>
                    <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm" value={formData.confirmPassword} onChange={handleChange} required />
                    <div className="show-password">
                        <input type="checkbox" name="showPassword" onChange={toggleShowPassword}  />
                        <label>Show Password</label>
                    </div>
                    <button onClick={handleSubmit} type="submit">Next</button>
                    <a href="/">Sign in instead</a>
                </form>
                </div>
            <div className="image-container">
                <img src={register} alt="Google Account Illustration" />
            </div>
            </div>
        </div>
    );
}

export default Register;
