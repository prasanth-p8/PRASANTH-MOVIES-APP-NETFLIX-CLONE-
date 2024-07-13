import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Popular = () => {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
  })

  const onSuccess = successData => {
    const formattedData = successData.map(eachData => ({
      id: eachData.id,
      backdropPath: eachData.backdrop_path,
      overview: eachData.overview,
      posterPath: eachData.poster_path,
      title: eachData.title,
    }))

    setApiStatus({
      status: apiConstants.success,
      data: formattedData,
    })
  }

  const onFailure = () => {
    setApiStatus({
      status: apiConstants.failure,
      data: null,
    })
  }

  const getPopular = async () => {
    setApiStatus({status: apiConstants.inProgress, data: null})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'

    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.ok) {
      onSuccess(responseData.results)
    } else {
      onFailure()
    }
  }

  useEffect(() => {
    getPopular()
  }, [])

  const renderLoadingView = () => (
    <>
      <Header />
      <div className="loading-spinner-popular" testid="loader">
        <Loader
          type="TailSpin"
          color="#D81F26"
          width="50"
          heigth="50"
          className="mobile-spinner"
        />
        <Loader
          type="TailSpin"
          color="#D81F26"
          width={70}
          heigth={70}
          className="desktop-spinner"
        />
      </div>
    </>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <>
        <Header />
        <ul className="popular-main-list">
          {data.map(eachData => {
            const {id, posterPath, title} = eachData

            return (
              <li key={id}>
                <Link to={`movies/${id}`}>
                  <img
                    src={posterPath}
                    alt={title}
                    className="popular-page-image"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
        <Footer />
      </>
    )
  }

  const renderFailureView = () => (
    <div>
      <Header />
      <div className="popular-failure-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1717594964/Background-Complete_j9zdtk.png"
          alt="failure view"
          className="popular-failure-view"
        />
        <h1 className="popular-failure-description">
          Something went wrong. Please try again
        </h1>
        <button
          type="button"
          onClick={getPopular}
          className="popular-failure-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderPopular = () => {
    const {status} = apiStatus

    switch (status) {
      case apiConstants.inProgress:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessView()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return <section className="popular-main-container">{renderPopular()}</section>
}

export default Popular
