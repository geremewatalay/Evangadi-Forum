import { useRef } from 'react';
import axios from '../axiosConfig'; // Ensure this path is correct
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const firstname = firstnameRef.current.value.trim();
    const lastname = lastnameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !firstname || !lastname || !email || !password) {
      alert('Please provide all required information.');
      return;
    }

    try {
      const response = await axios.post('/users/register', {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message || 'Registration failed'}`);
      } else {
        alert('Something went wrong. Please try again later.');
      }
      console.error('Error details:', error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Username: </span>
            <input ref={usernameRef} type="text" placeholder="Enter username" required />
          </label>
        </div>
        <br />
        <div>
          <label>
            <span>First Name: </span>
            <input ref={firstnameRef} type="text" placeholder="Enter first name" required />
          </label>
        </div>
        <br />
        <div>
          <label>
            <span>Last Name: </span>
            <input ref={lastnameRef} type="text" placeholder="Enter last name" required />
          </label>
        </div>
        <br />
        <div>
          <label>
            <span>Email: </span>
            <input ref={emailRef} type="email" placeholder="Enter email" required />
          </label>
        </div>
        <br />
        <div>
          <label>
            <span>Password: </span>
            <input ref={passwordRef} type="password" placeholder="Enter password" required />
          </label>
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default Register;
