import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='page-up'>
        <a href='#' id='scrollToTopButton'>
          <span className='arrow_carrot-up'></span>
        </a>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='footer__logo'>
              <Link href='./index.html'>
                <img src='/img/logo.png' alt='' />
              </Link>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='footer__nav'>
              <ul>
                <li className='active'>
                  <Link href='./index.html'>Homepage</Link>
                </li>
                <li>
                  <Link href='./categories.html'>Categories</Link>
                </li>
                <li>
                  <Link href='./blog.html'>Our Blog</Link>
                </li>
                <li>
                  <Link href='#'>Contacts</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-lg-3'>
            <p>
              Copyright &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
