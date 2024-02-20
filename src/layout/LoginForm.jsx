import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      // การตรวจสอบความถูกต้อง
      const response = await axios.post('http://localhost:8889/auth/login', input);
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:8889/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      console.log(userResponse.data);
      setUser(userResponse.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl mb-4 text-center">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">ชื่อผู้ใช้</label>
            <input
              type="text"
              id="username"
              name="username"
              value={input.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Password"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <button type="submit" className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">เข้าสู่ระบบ</button>
            {/* <hr />
            <button type="button" className="block w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Login with Google</button>
            <button type="button" className="block w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">Login with Apple</button> */}
          </div>
          
        </form>
      </div>
    </div>
  );
}
