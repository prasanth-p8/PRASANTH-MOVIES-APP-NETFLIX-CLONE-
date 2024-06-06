import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactStickSlider from '../ReactStickSlider'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const TrendingNow = () => {
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

  const getTrendingNow = async () => {
    setApiStatus({status: apiConstants.inProgress, data: null})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'

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
    getTrendingNow()
  }, [])

  const renderLoadingView = () => (
    <div className="loading-spinner-slider" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        width={32}
        height={32}
        className="mobile-loader"
      />
      <Loader
        type="TailSpin"
        color="#D81F26"
        width={60}
        height={60}
        className="desktop-loader"
      />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus
    console.log(data)

    return (
      <div className="slick-container">
        <ReactStickSlider stickData={data} />
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="trending-failure-view">
      <img
        src="https://res.cloudinary.com/dlefoxknm/image/upload/v1717572642/alert-triangle_rznrel.png"
        alt="retry warning"
        className="trending-warning-image"
      />
      <p className="trending-failure-description">
        Something went wrong. Please try again
      </p>
      <button onClick={getTrendingNow} className="trending-failure-button">
        Try Again
      </button>
    </div>
  )

  const renderTrendingNow = () => {
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

  return (
    <div className="trending-main-container">
      <h1 className="trending-now-heading">Trending Now</h1>
      {renderTrendingNow()}
    </div>
  )
}

export default TrendingNow
