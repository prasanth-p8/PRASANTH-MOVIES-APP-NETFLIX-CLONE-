import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
  })

  const onSuccess = data => {
    const dataLength = data.length
    const randomPosterData = data[Math.floor(Math.random() * dataLength)]
    const updateData = {
      id: randomPosterData.id,
      overview: randomPosterData.overview,
      title: randomPosterData.title,
      backdropPath: randomPosterData.backdrop_path,
      posterPath: randomPosterData.poster_path,
    }
    setApiStatus({
      status: apiConstants.success,
      data: updateData,
    })
  }

  const randomMovieGen = async () => {
    setApiStatus({
      status: apiConstants.inProgress,
      data: null,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      onSuccess(responseData.results)
    } else {
      setApiStatus({
        status: apiConstants.failure,
        data: null,
      })
    }
  }

  useEffect(() => {
    randomMovieGen()
  }, [])

  const renderLoadingHomeView = () => (
    <>
      <Header />
      <div className="loading-spinner-home-poster" testid="loader">
        <Loader
          type="TailSpin"
          color="#D81F26"
          width={60}
          height={60}
          className="mobile-loader"
        />
        <Loader
          type="TailSpin"
          color="#D81F26"
          width={90}
          height={90}
          className="desktop-loader"
        />
      </div>
    </>
  )

  const renderSuccessHomeView = () => {
    const {data} = apiStatus
    const {id, overview, title, backdropPath} = data

    return (
      <div
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
        }}
        className="home-poster-container"
      >
        <Header />
        <div className="home-poster-content">
          <h1 className="home-poster-heading">{title}</h1>
          <p className="home-poster-description">{overview}</p>
          <Link to={`/movies/${id}`}>
            <button type="button" className="home-poster-play-button">
              Play
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const renderFailureHomeView = () => (
    <div>
      <Header />
      <div className="home-poster-failure-view">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1717572642/alert-triangle_rznrel.png"
          alt="retry warning"
          className="retry-warning-image"
        />
        <p className="home-poster-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          onClick={randomMovieGen}
          className="home-poster-failure-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderHomePage = () => {
    const {status} = apiStatus

    switch (status) {
      case apiConstants.inProgress:
        return renderLoadingHomeView()
      case apiConstants.success:
        return renderSuccessHomeView()
      case apiConstants.failure:
        return renderFailureHomeView()
      default:
        return null
    }
  }

  return (
    <section className="home-main-page">
      {renderHomePage()}
      <TrendingNow />
      <Originals />
      <Footer />
    </section>
  )
}

export default Home
