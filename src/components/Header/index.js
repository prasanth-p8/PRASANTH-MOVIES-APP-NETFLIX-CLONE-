import {useState} from 'react'
import {Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import {AiOutlineMenuUnfold} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {showSearchBar, searchValue} = props

  const [displayHamburger, setDisplayHamburger] = useState(false)
  const [userSearchInput, setUserSearchInput] = useState(searchValue)

  const userSearchValue = event => {
    setUserSearchInput(event.target.value)
  }

  const openHamburgerMenu = () => {
    setDisplayHamburger(true)
  }

  const closeHamburgerMenu = () => {
    setDisplayHamburger(false)
  }

  const searchTheValueEnter = event => {
    const {userSearch} = props
    if (event.key === 'Enter') {
      userSearch(event.target.value)
    }
  }

  const searchTheValueClick = () => {
    const {userSearch} = props
    userSearch(userSearchInput)
  }

  return (
    <>
      <section className="header-mobile-container">
        <div className="mobile-container">
          <Link to="/" className="link-item">
            <img
              src="https://fontmeme.com/permalink/240510/5edd1be1ee20090e9de67bbe7465bb2b.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <nav className="header-mobile-nav-bar">
            {showSearchBar && (
              <div className="search-bar-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onKeyDown={searchTheValueEnter}
                  value={userSearchInput}
                  onChange={userSearchValue}
                />
                <button
                  type="button"
                  className="search-bar-button"
                  testid="searchButton"
                  onClick={searchTheValueClick}
                >
                  <HiOutlineSearch size={16} color="#ffffff" />
                </button>
              </div>
            )}
            {!showSearchBar && (
              <Link to="/search" className="link-item">
                <button
                  type="button"
                  className="search-mobile-view"
                  testid="searchButton"
                >
                  <HiOutlineSearch size={25} color="#ffffff" />
                </button>
              </Link>
            )}
            <button
              type="button"
              onClick={openHamburgerMenu}
              className="hamburger-mobile-icon"
            >
              <AiOutlineMenuUnfold size={25} color="#ffffff" />
            </button>
          </nav>
        </div>
        {displayHamburger && (
          <ul value={displayHamburger} className="hamburger-menu-list">
            <li>
              <Link className="hamburger-link-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hamburger-link-item" to="/popular">
                Popular
              </Link>
            </li>
            <li>
              <Link className="hamburger-link-item" to="/account">
                Account
              </Link>
            </li>
            <li>
              <button
                onClick={closeHamburgerMenu}
                className="hamburger-close-button"
                type="button"
              >
                <IoIosCloseCircle size="25" />
              </button>
            </li>
          </ul>
        )}
      </section>
      <section className="header-desktop-container">
        <div className="desktop-view-nav-bar-1">
          <Link to="/" className="link-item">
            <img
              src="https://fontmeme.com/permalink/240510/5edd1be1ee20090e9de67bbe7465bb2b.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <Link to="/" className="link-item">
            <p>Home</p>
          </Link>
          <Link to="/popular" className="link-item">
            <p>Popular</p>
          </Link>
        </div>
        <nav className="desktop-view-nav-bar-2">
          {showSearchBar && (
            <div className="search-bar-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onKeyDown={searchTheValueEnter}
                value={userSearchInput}
                onChange={userSearchValue}
              />
              <button
                type="button"
                className="search-bar-button"
                testid="searchButton"
                onClick={searchTheValueClick}
              >
                <HiOutlineSearch size={20} color="#ffffff" />
              </button>
            </div>
          )}
          {!showSearchBar && (
            <Link to="/search" className="link-item">
              <button
                type="button"
                className="search-mobile-view"
                testid="searchButton"
              >
                <HiOutlineSearch size={25} color="#ffffff" />
              </button>
            </Link>
          )}
          <Link to="/account" className="link-item">
            <img
              src="https://res.cloudinary.com/dlefoxknm/image/upload/v1715425326/netflix%20clone%20app%20avatar%20image.png"
              alt="website-avatar"
              className="website-avatar"
            />
          </Link>
        </nav>
      </section>
    </>
  )
}

export default Header
