import React from 'react'
import Link from 'next/link'

const TopView = () => {
  return (
    <div className='product__sidebar__view'>
      <div className='section-title'>
        <h5>Top Views</h5>
      </div>
      <ul className='filter__controls'>
        <li className='active' data-filter='*'>
          Day
        </li>
        <li data-filter='.week'>Week</li>
        <li data-filter='.month'>Month</li>
        <li data-filter='.years'>Years</li>
      </ul>
      <div className='filter__gallery'>
        <div
          className='product__sidebar__view__item set-bg mix week years'
          style={{ backgroundImage: "url('img/sidebar/tv-3.jpg')" }}
        >
          <div className='ep'>18 / ?</div>
          <div className='view'>
            <i className='fa fa-eye'></i> 9141
          </div>
          <h5>
            <Link href='/'>Sword art online alicization war of underworld</Link>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default TopView
