import React, { useEffect } from 'react'
import Link from 'next/link'
import BreadCrumb from '../components/BreadCrumb'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <BreadCrumb title='Login' />
      <section className='login spad'>
        <div className='container'>
          <div className='login__social'>
            <div className='row d-flex justify-content-center'>
              <div className='col-lg-6'>
                <div className='login__social__links'>
                  <ul>
                    <li>
                      <a href='#' className='facebook'>
                        <i className='fa fa-facebook'></i> Sign in With Facebook
                      </a>
                    </li>
                    <li>
                      <a href='#' className='google'>
                        <i className='fa fa-google'></i> Sign in With Google
                      </a>
                    </li>
                    <li>
                      <a href='#' className='twitter'>
                        <i className='fa fa-twitter'></i> Sign in With Twitter
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Login
