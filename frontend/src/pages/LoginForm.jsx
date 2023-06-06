import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext); // Access the isAuthenticated and logout from AuthContext

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });
      navigate('/'); // Replace '/login' with the actual path of your login page
      console.log('Token: ' + response.data.refresh);
      localStorage.setItem('token', response.data.refresh);
      // Handle successful login
      console.log(response.data);
      login();
      console.log(isAuthenticated)
      setError('');

      // Do something with the response, such as storing tokens or updating the authentication state

    } catch (error) {
      // Handle login error
      console.log(error.response);
      setError('Invalid email or password.');
    }
  };

  return (
<div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10">
  <div className="flex shadow-md">
    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width:'24rem',height:'32em'}}>
      <div className="w-72">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <small className="text-gray-400">Welcome back! Please enter your details</small>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Email</label>
            <input 
            type="email" value={username}
             onChange={handleUsername}
             placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Password</label>
            <input type="password"
            value={password}
             onChange={handlePasswordChange} 
             placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
          </div>

          <div className="mb-3 flex flex-wrap content-center">
            <input id="remember" type="checkbox" className="mr-1 checked:bg-purple-700" /> <label  className="mr-auto text-xs font-semibold">Remember for 30 days</label>
            <a href="#" className="text-xs font-semibold text-purple-700">Forgot password?</a>
          </div>

          <div className="mb-3">
            <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md" type="submit">Sign in</button>
            <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
              <img className="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"/>
              Sign in with Google
            </button>
            {error && <div classNameName="error">{error}</div>}
          </div>
        </form>

        <div className="text-center">
          <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
          <a href="#" className="text-xs font-semibold text-purple-700">Sign up</a>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{width:'24rem',height:'32em'}}>
      <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"/>
    </div>
  </div>
</div>

  );
};

export default LoginForm;
