import {useState, useEffect} from 'react'
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
    error: null,
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
      error: null,
    })
  }

  const randomMovieGen = async () => {
    setApiStatus({
      status: apiConstants.inProgress,
      data: null,
      error: null,
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
    }
  }

  useEffect(() => {
    randomMovieGen()
  }, [])

  const renderLoadingHomeView = () => (
    <div className="loading-spinner">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderSuccessHomeView = () => {
    const {data} = apiStatus
    const {id, overview, title, posterPath} = data

    return (
      <section className="home-main-page">
        <div className="home-poster-container">
          <div>
            <h1>{title}</h1>
            <p>{overview}</p>
            <button type="button">Play</button>
          </div>
        </div>
        <TrendingNow />
        <Originals />
      </section>
    )
  }

  const renderFailureHomeView = () => <div>failure</div>

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
    <>
      <Header />
      <div>{renderHomePage()}</div>
      <Footer />
    </>
  )
}

export default Home
