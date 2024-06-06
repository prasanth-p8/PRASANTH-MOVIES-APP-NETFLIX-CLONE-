import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {minutesToHours, getYear, format} from 'date-fns'
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

    const hour = minutesToHours(runtime)
    const min = runtime % 60
    const year = getYear(new Date(releaseDate))
    const formattedDate = format(new Date(releaseDate), 'do MMMM yyyy')

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
              <li>
                {hour}h {min}m
              </li>
              <li className="adult-content">{adult ? 'A' : 'U/A'}</li>
              <li>{year}</li>
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
            <h1 className="details-title">Genres</h1>
            <ul className="catagory-list">
              {genres.map(eachGenre => (
                <li key={eachGenre.id}>
                  <p>{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </li>
          <li className="movie-item-detail-section">
            <h1 className="details-title">Audio Available</h1>
            <ul className="catagory-list">
              {spokenLanguage.map(lang => (
                <li key={lang.id}>
                  <p>{lang.englishName}</p>
                </li>
              ))}
            </ul>
          </li>
          <li className="movie-item-detail-section">
            <h1 className="details-title">Rating Count</h1>
            <p className="details-value">{voteCount}</p>
            <h1 className="details-title">Rating Average</h1>
            <p className="details-value">{voteAverage}</p>
          </li>
          <li className="movie-item-detail-section">
            <h1 className="details-title">Budget</h1>
            <p className="details-value">{budget}</p>
            <h1 className="details-title">Release Date</h1>
            <p className="details-value">{formattedDate}</p>
          </li>
        </ul>
        <div className="similar-movies-container">
          <h1 className="similar-movies-heading">More like this</h1>
          <ul className="similar-movies-list">
            {similarMovie.map(eachMovie => (
              <Link
                key={eachMovie.id}
                onClick={getMovieItemDetails}
                to={`/movies/${eachMovie.id}`}
              >
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="similar-movies-image"
                />
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
          alt="failure view"
          className="movie-item-failure-view"
        />
        <p className="movie-item-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
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
