import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <section className="footer-main-container">
    <div>
      <ul className="footer-icon-list">
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
      <p>Contact Us</p>
    </div>
  </section>
)

export default Footer
