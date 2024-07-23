import { useState } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import axios from'axios';

const Register = () => {

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:""
  });
  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]:e.target.value}));
  }
  // console.log(inputs);
  const handleClick = async(e) => {

    try{
      await axios.post("https://social-media-backend-y14s.onrender.com/api/auth/register",inputs)

    } catch (err){
      setErr(err.response.data)
    }
  }

  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1>MeetUp.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora porro aliquid aspernatur ratione sequi maiores repellat iste. Numquam.</p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input type='text' placeholder='Username' name='username' onChange={handleChange}></input>
            <input type='mail' placeholder='Email' name='email' onChange={handleChange}></input>
            <input type='password' placeholder='Password' name='password' onChange={handleChange}></input>
            <input type='text' placeholder='Name' name='name' onChange={handleChange}></input>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register