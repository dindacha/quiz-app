import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = ({history}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
       
        if (username.trim() && password.trim()) {
            localStorage.setItem('username', username); 
            navigate('/quiz');
          } else {
            alert('Please enter both username and password');
          }
    };

  return (
    <div className="login-container">
    <div class="icon-container">
    <span class="material-symbols-outlined icon-movie">movie</span>
    </div>
      <h1>Movie Quiz</h1>
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login