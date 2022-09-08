import React from 'react'
import Link from 'next/link'

const StyledBreadCrumb: React.FC = () => {
  return (
    <div className='breadcrumb-option'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='breadcrumb__links'>
              <Link href='./index.html'>
                {/*<i className='fa fa-home'></i> */} Home
              </Link>
              <Link href='./categories.html'>Categories</Link>
              <span>Romance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StyledBreadCrumb
