import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div>
      <ul className="footer-icon-list">
        <li>
          <FaGoogle className="icon-size" />
        </li>
        <li>
          <FaTwitter className="icon-size" />
        </li>
        <li>
          <FaInstagram className="icon-size" />
        </li>
        <li>
          <FaYoutube className="icon-size" />
        </li>
      </ul>
      <p className="footer-contact-us">Contact us</p>
    </div>
  </footer>
)

export default Footer
