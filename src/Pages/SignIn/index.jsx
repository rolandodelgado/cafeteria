import { useState } from 'react'
import coffeeIcon from '../../assets/coffee.svg'
import jwtDecode from 'jwt-decode'

const SignIn = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandle = (e) => {
    e.preventDefault()
    // login and get an user with JWT token
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((tokenData) => {
        window.localStorage.setItem('accessToken', JSON.stringify(tokenData.access))
        console.log(tokenData);
        console.log(jwtDecode(tokenData.access).user_id);
        onLogin(jwtDecode(tokenData.access).user_id)
      })
  }

  return (
    <div className='grid place-items-center h-screen'>
    <form onSubmit={loginHandle}>
      <>
      <div className='coffeeBlock'>
        <div className="vapour">
          <span style={{'--v': 1}}></span>
          <span style={{'--v': 2}}></span>
          <span style={{'--v': 5}}></span>
          <span style={{'--v': 4}}></span>
          <span style={{'--v': 6}}></span>
          <span style={{'--v': 19}}></span>
          <span style={{'--v': 7}}></span>
          <span style={{'--v': 8}}></span>
          <span style={{'--v': 9}}></span>
          <span style={{'--v': 10}}></span>
          <span style={{'--v': 11}}></span>
          <span style={{'--v': 18}}></span>
        </div>
      </div>
        <img src={coffeeIcon} alt="Coffee Icon" width={100} />
        <div className='flex justify-center gap-1'>
                        <h4 className="font-sans italic text-2xl">It's</h4>
                        <h4 className="font-extrabold text-2xl">Coffee Time</h4>
                    </div>
     <input
        aria-label="Username"
        placeholder="Ingrese usuario"
        id="username"
        type="text"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <input
        aria-label="Password"
        placeholder="Ingrese contraseña"
        id="password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <button type="submit" className='w-full border-white border-2' >Login</button>
    </>
    </form>
    </div>
  )
}

export default SignIn