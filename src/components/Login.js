import React, {useState} from 'react';
import '../App.css';
import LoginButton from './LoginButton';

export default function Login( {setToken} ) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setError] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
          email:username,
          password
        }, setToken);
      }

    async function loginUser(credentials, setToken) {
    return fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(data => data.token !== undefined ? setToken(data.token) : setError('Incorrect user or password'))
    }

  return(
    <div className="login-wrapper">
      <p className='white'>Demo login credentials: Username: eve.holt@reqres.in Password: cityslicka</p>
      <form onSubmit={handleSubmit} className="loginForm">
          <h1 className='loginTitle'>Please Log In</h1>
          <label className='formLabel'>
              <p className='formLabelTitle'>Username</p>
              <input className='formInput'  type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label className='formLabel'>
              <p className='formLabelTitle'>Password</p>
              <input className='formInput' type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
             <LoginButton value={"Log in"} />
          </div>
          <p className='errorMessage'>{errorMessage}</p>
      </form>
    </div>
  )
}


