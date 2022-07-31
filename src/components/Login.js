import React, {useState} from 'react';
import '../App.css';
import PropTypes from 'prop-types';

async function loginUser(credentials, setToken) {
    console.log(JSON.stringify(credentials));
    return fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(data => setToken(data.token))
   }

export default function Login( {setToken} ) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email:username,
          password
        }, setToken);
      }

  return(
    <div className="login-wrapper">
    <h1 className='loginTitle'>Please Log In</h1>
        <form onSubmit={handleSubmit} className="loginForm">
            <label className='formLabel'>
                <p className='formLabelTitle'>Username</p>
                <input className='formInput'  type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label className='formLabel'>
                <p className='formLabelTitle'>Password</p>
                <input className='formInput' type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit" className='formButton'>Log in</button>
            </div>
        </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

