import './index.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <section className="not-found-container">
      <div>
        <h1 className="not-found-heading">Lost Your Way ?</h1>
        <p className="not-found-description">
          we are sorry, the page you requested could not be found Please go back
          to the homepage
        </p>
        <button onClick={goToHome} type="button" className="not-found-button">
          Go to Home
        </button>
      </div>
    </section>
  )
}

export default NotFound
