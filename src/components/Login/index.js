import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const getUsername = event => {
    setUsername(event.target.value)
  }

  const getPassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('./')
  }

  const onSubmitFailure = message => {
    console.log(message)
    setErrorMsg(message)
    setShowErrorMsg(true)
  }

  const loginForm = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      onSubmitSuccess(responseData.jwt_token)
    } else {
      console.log(responseData)
      onSubmitFailure(responseData.error_msg)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <section className="login-main-container">
      <div className="login-container">
        <img
          src="https://fontmeme.com/permalink/240530/5edd1be1ee20090e9de67bbe7465bb2b.png"
          alt="login website logo"
          className="login-website-logo"
        />
        <form className="form-container" onSubmit={loginForm}>
          <h1 className="form-heading">Login</h1>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={getUsername}
              className="user-input"
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="user-input"
              onChange={getPassword}
            />
          </div>
          {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </section>
  )
}

export default Login
