import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <section className="not-found-container">
    <div>
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be foundPlease go back to
        the homepage.
      </p>
      <Link to="/">
        <button type="button" className="not-found-button">
          Go to Home
        </button>
      </Link>
    </div>
  </section>
)

export default NotFound
