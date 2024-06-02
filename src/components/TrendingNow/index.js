import {useState, useEffect} from 'react'
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
    error: null,
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
      error: null,
    })
  }

  const onFailure = failureData => {
    setApiStatus({
      status: apiConstants.failure,
      data: null,
      error: failureData,
    })
  }

  const getTrendingNow = async () => {
    setApiStatus({status: apiConstants.inProgress, data: null, error: null})
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
      onFailure(responseData.error_msg)
    }
  }

  useEffect(() => {
    getTrendingNow()
  }, [])

  const renderLoadingView = () => <div>Loading</div>

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <div className="trending-main-container">
        <h1 className="trending-now-heading">Trending Now</h1>
        <div className="slick-container">
          <ReactStickSlider stickData={data} />
        </div>
      </div>
    )
  }

  const renderFailureView = () => {
    const {error} = apiStatus

    return <div>{error}</div>
  }

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

  return renderTrendingNow()
}

export default TrendingNow
