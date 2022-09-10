import React from 'react'
import Link from 'next/link'

interface Props {
  category?: Category
  movieName?: string
}

const StyledBreadCrumb: React.FC<Props> = ({ category, movieName }) => {
  return (
    <div className='breadcrumb-option'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='breadcrumb__links'>
              <a href='/'>
                <i className='fa fa-home'></i> Home
              </a>
              <Link href='#'>Categories</Link>
              {movieName ? (
                <>
                  <a href={`/categories/${category?._id}`}>{category?.title}</a>
                  <span>{movieName}</span>
                </>
              ) : (
                <span>{category?.title}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StyledBreadCrumb
