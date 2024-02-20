import axios from 'axios';
import { useState } from "react";
// import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username:'',
    password: '',
    email:'',
    role: '',
    address: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      // การตรวจสอบความถูกต้อง
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      const response = await axios.post('http://localhost:8889/auth/register', input);
      console.log(response);
      if (response.status === 200) {
        alert('Register Successful');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl mb-4 text-center">ลงทะเบียน</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label className="form-control w-full max-w-xs mx-auto mb-5 ">
          <div className="label">
            <span className="label-text">ชื่อผู้ใช้</span>
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
            name="firstname"
            placeholder="Username"
            value={input.firstname}
            onChange={ handleChange }
          />
          </label>
          </div>
          <div className="mb-4">
          <label className="form-control w-full max-w-xs mx-auto mb-5 ">
          <div className="label">
            <span className="label-text">อีเมล</span>
          </div>
          <input
            type="email"
            className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
            name="email"
            placeholder=""
            value={input.email}
            onChange={ handleChange }
          />
        </label>

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
              placeholder="อย่างน้อย 8 ตัวอักษร"
            />
          </div>

        <label className="form-control w-full max-w-xs mx-auto mb-5 ">
          <div className="label">
            <span className="label-text">ที่อยู่</span>
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
            name="address"
            placeholder="Address"
            value={input.address}
            onChange={ handleChange }
          />
        </label>

  
          
          {/* <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Confirm Password"
            />
          </div> */}
          <div className="mb-4 flex flex-col gap-2">
            <button type="submit" className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">ลงทะเบียน</button>

          </div>
          
          {/* <div className="mb-4 flex flex-col gap-2">
            <button type="button" className="block w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Login with Google</button>
            <button type="button" className="block w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">Login with Apple</button>
          </div> */}
          {/* <div className="mt-4 text-center">
            <span className="text-gray-700">Already have an account? </span>
            <Link to="/login" className="text-indigo-500 hover:text-indigo-700">Login here</Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}
