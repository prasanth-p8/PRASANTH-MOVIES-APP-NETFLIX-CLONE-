import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const {history} = props

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const passwordInAsterisk = '*'.repeat(password.length)

  const logoutUser = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <section className="account-page">
      <Header />
      <div className="account-main-container">
        <h1 className="account-heading">Account</h1>
        <hr />
        <div className="account-main">
          <p className="account-main-heading">Member ship</p>
          <div className="account-main-sub">
            <p className="user-mail-id">{username}@gmail.com</p>
            <p className="user-password">Password : {passwordInAsterisk}</p>
          </div>
        </div>
        <hr />
        <div className="account-main">
          <p className="account-main-heading">Plan details </p>
          <div className="plan-details-container">
            <p className="premium-text">Premium</p>
            <p className="plan-name">Ultra HD</p>
          </div>
        </div>
        <hr />
        <div className="logout-button-container">
          <button type="button" onClick={logoutUser} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Account
