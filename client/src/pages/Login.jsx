import { useRef } from 'react';
import axios from '../axiosConfig';
import {Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
        !emailValue ||
        !passValue
    ){
        alert('please provide all required information');
        return;
    }
    try {
      const {data} = await axios.post('/users/login', {
        email: emailValue,
        password: passValue,
      });
      alert('login successfull,go to home');
      localStorage.setItem('token', data.token);
    

      navigate('/');
      console.log(data);

    } catch (error) {
      alert('something went wrong!');
      console.log( error.response);
      
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder="email" required />
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder="password" required />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to ={'/register'}>Register</Link>
    </section>
  )
}

export default Login;