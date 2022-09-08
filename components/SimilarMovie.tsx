import React from 'react'
import Link from 'next/link'

const SimilarMovie = () => {
  return (
    <div className='col-lg-4 col-md-4'>
      <div className='anime__details__sidebar'>
        <div className='section-title'>
          <h5>you might like...</h5>
        </div>
        <div
          className='product__sidebar__view__item set-bg'
          style={{ backgroundImage: "url('/img/sidebar/tv-1.jpg')" }}
        >
          <div className='ep'>18 / ?</div>
          <div className='view'>
            <i className='fa fa-eye'></i> 9141
          </div>
          <h5>
            <Link href='#'>Boruto: Naruto next generations</Link>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default SimilarMovie
