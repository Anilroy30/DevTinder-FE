import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState(true);
  const disPatch = useDispatch();
  const navigate = useNavigate();


  // used cors to pass cross origin in backend
  const handleLogin = async () => {

    try{
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true});

      disPatch(addUser(res.data))
      return navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "something went wrong");
    }
  }

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      disPatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data || "something went wrong");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{loginForm ? "Login" : "Sign Up"}</h2>
          {!loginForm && <>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input value={firstName} type="text" className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstName(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input value={lastName} type="text" className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastName(e.target.value)} />
            </label>
            </>}

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input value={emailId} type="text" className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input value={password} type="password" className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setPassword(e.target.value)}  />
            </label>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center ">
            <button className="btn btn-primary" onClick={loginForm ? handleLogin : handleSignUp}>{loginForm ? "Login" : "Sign Up"}</button>
          </div>

          <p className='m-auto cursor-pointer p-6' onClick={() => setLoginForm((value) => !value)}>{loginForm ? "New User? SignUp Here" : "Existing User? Login Here"}</p>
        </div>
      </div>
  )
}

export default Login