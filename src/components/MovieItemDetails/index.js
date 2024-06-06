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

const MovieItemDetails = props => {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    movieDetails: null,
    similarMovie: null,
  })

  const onSuccess = successData => {
    const spokenLanguage = successData.spoken_languages.map(eachLang => ({
      id: eachLang.id,
      englishName: eachLang.english_name,
    }))
    const similarMovie = successData.similar_movies.map(eachMovie => ({
      backdropPath: eachMovie.backdrop_path,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
      id: eachMovie.id,
    }))

    const formattedData = {
      adult: successData.adult,
      backdropPath: successData.backdrop_path,
      budget: successData.budget,
      genres: successData.genres,
      id: successData.id,
      overview: successData.overview,
      posterPath: successData.poster_path,
      releaseDate: successData.release_date,
      runtime: successData.runtime,
      spokenLanguage,
      title: successData.title,
      voteAverage: successData.vote_average,
      voteCount: successData.vote_count,
    }

    setApiStatus({
      status: apiConstants.success,
      movieDetails: formattedData,
      similarMovie,
    })
  }

  const onFailure = () => {
    setApiStatus({
      status: apiConstants.failure,
      movieDetails: null,
      similarMovie: null,
    })
  }

  const getMovieItemDetails = async () => {
    setApiStatus({
      status: apiConstants.inProgress,
      movieDetails: null,
      similarMovie: null,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {id} = props.match.params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.ok) {
      onSuccess(responseData.movie_details)
    } else {
      onFailure()
    }
  }

  useEffect(() => {
    getMovieItemDetails()
  }, [])

  const renderLoadingView = () => (
    <>
      <Header />
      <div className="loading-spinner-movie-item" testid="loader">
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
    const {movieDetails, similarMovie} = apiStatus
    const {
      adult,
      backdropPath,
      budget,
      genres,
      id,
      overview,
      releaseDate,
      runtime,
      spokenLanguage,
      title,
      voteAverage,
      voteCount,
    } = movieDetails

    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: '100% 100%',
          }}
          className="movie-item-container"
        >
          <Header />
          <div className="movie-item-content">
            <h1 className="movie-title">{title}</h1>
            <ul className="movie-details-list">
              <li>{runtime}</li>
              <li className="adult-content">{adult ? 'A' : 'U/A'}</li>
              <li>{releaseDate}</li>
            </ul>
            <p className="movie-item-description">{overview}</p>
            <Link to={`/movies/${id}`} className="movie-item-link">
              <button type="button" className="movie-item-play-button">
                Play
              </button>
            </Link>
          </div>
        </div>
        <ul className="movie-item-detail-content">
          <li className="movie-item-detail-section">
            <p className="details-title">Genres</p>
            <ul className="catagory-list">
              {genres.map(eachGenre => (
                <li key={eachGenre.id}>{eachGenre.name}</li>
              ))}
            </ul>
          </li>
          <li className="movie-item-detail-section">
            <p className="details-title">Audio Available</p>
            <ul className="catagory-list">
              {spokenLanguage.map(lang => (
                <li key={lang.id}>{lang.englishName}</li>
              ))}
            </ul>
          </li>
          <li className="movie-item-detail-section">
            <p className="details-title">Rating Count</p>
            <p className="details-value">{voteCount}</p>
            <p className="details-title">Rating Average</p>
            <p className="details-value">{voteAverage}</p>
          </li>
          <li className="movie-item-detail-section">
            <p className="details-title">Budget</p>
            <p className="details-value">{budget}</p>
            <p className="details-title">Release Date</p>
            <p className="details-value">{releaseDate}</p>
          </li>
        </ul>
        <div className="similar-movies-container">
          <h1 className="similar-movies-heading">More like this</h1>
          <ul className="similar-movies-list">
            {similarMovie.map(eachMovie => (
              <Link to={`/movies/${eachMovie.id}`} target="blank">
                <li key={eachMovie.id}>
                  <img
                    src={eachMovie.posterPath}
                    alt={eachMovie.title}
                    className="similar-movies-image"
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  const renderFailureView = () => (
    <div>
      <Header />
      <div className="movie-item-failure-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1717594964/Background-Complete_j9zdtk.png"
          alt="movie item failure view"
          className="movie-item-failure-view"
        />
        <p className="movie-item-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          onClick={getMovieItemDetails}
          className="movie-item-failure-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderMovieItemDetails = () => {
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
    <section className="moives-item-main-container">
      {renderMovieItemDetails()}
    </section>
  )
}

export default MovieItemDetails
