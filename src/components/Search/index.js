import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Search = () => {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
  })
  const [searchText, setSearchText] = useState('')

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

  const getSearch = async () => {
    setApiStatus({status: apiConstants.inProgress, data: null})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`

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
    getSearch()
  }, [searchText])

  const searchMovie = value => {
    setSearchText(value)
  }

  const renderLoadingView = () => (
    <>
      <Header />
      <div className="loading-spinner-search" testid="loader">
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
    const renderSearchPage = data.length !== 0
    const NoSearch = searchText === ''

    const trueValue = true

    return (
      <div>
        <Header
          userSearch={searchMovie}
          showSearchBar={trueValue}
          searchValue={searchText}
        />
        {renderSearchPage && !NoSearch && (
          <ul className="search-list">
            {data.map(eachData => {
              const {id, posterPath, title} = eachData

              return (
                <li key={id}>
                  <Link to={`movies/${id}`}>
                    <img
                      src={posterPath}
                      alt={title}
                      className="search-image"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
        {!renderSearchPage && (
          <div className="no-search-container">
            <img
              src="https://res.cloudinary.com/dlefoxknm/image/upload/v1717658029/Group_7394_aphun6.png"
              alt="no movies"
              className="no-search-image"
            />
            <p className="no-search-description">
              Your search for {searchText} did not find any matches.
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderFailureView = () => (
    <div>
      <Header />
      <div className="search-failure-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1717594964/Background-Complete_j9zdtk.png"
          alt="failure view"
          className="search-failure-view"
        />
        <p className="search-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          onClick={getSearch}
          className="search-failure-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderSearch = () => {
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
  return <section className="search-main-container">{renderSearch()}</section>
}

export default Search
