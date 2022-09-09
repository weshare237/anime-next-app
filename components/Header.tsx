import React from 'react'

import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-2'>
            <div className='header__logo'>
              <Link href='/'>
                <img src='/img/logo.png' alt='' />
              </Link>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='header__nav'>
              <nav className='header__menu mobile-menu'>
                <ul>
                  <li className='active'>
                    <Link href='/'>Homepage</Link>
                  </li>
                  <li>
                    <a href='/categories'>
                      Categories
                      <span className='arrow_carrot-down'></span>
                    </a>
                    <ul className='dropdown'>
                      <li>
                        <Link href='/categories'>Categories</Link>
                      </li>
                      <li>
                        <Link href='/anime-details'>Anime Details</Link>
                      </li>
                      <li>
                        <Link href='/anime-watching'>Anime Watching</Link>
                      </li>
                      <li>
                        <Link href='/blog-details'>Blog Details</Link>
                      </li>
                      <li>
                        <Link href='/signup'>Sign Up</Link>
                      </li>
                      <li>
                        <Link href='/login'>Login</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href='/blog'>Our Blog</Link>
                  </li>
                  <li>
                    <Link href='#'>Contacts</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='header__right'>
              <a href='#' className='search-switch'>
                <span className='icon_search'></span>
              </a>
              <a href='/login'>
                <span className='icon_profile'></span>
              </a>
            </div>
          </div>
        </div>
        <div id='mobile-menu-wrap'></div>
      </div>
    </header>
  )
}

export default Header
