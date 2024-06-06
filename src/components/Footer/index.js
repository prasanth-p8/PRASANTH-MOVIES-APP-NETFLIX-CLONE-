import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div>
      <ul className="footer-icon-list-mobile">
        <li>
          <FaGoogle />
        </li>
        <li>
          <FaTwitter />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaYoutube />
        </li>
      </ul>
      <ul className="footer-icon-list-desktop">
        <li>
          <FaGoogle size={18} />
        </li>
        <li>
          <FaTwitter size={18} />
        </li>
        <li>
          <FaInstagram size={18} />
        </li>
        <li>
          <FaYoutube size={18} />
        </li>
      </ul>
      <p className="footer-contact-us">Contact us</p>
    </div>
  </footer>
)

export default Footer
