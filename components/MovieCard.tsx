import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'

interface Props {
  movie: Movie
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <div className='col-lg-4 col-md-6 col-sm-6'>
      <div className='product__item'>
        <div
          className='product__item__pic set-bg'
          style={{
            backgroundImage: `url(${urlFor(movie.mainImage).url()})`,
          }}
        >
          <div className='ep'>18 / 18</div>
          <div className='comment'>
            <i className='fa fa-comments'></i> {movie.comments.length}
          </div>
          <div className='view'>
            <i className='fa fa-eye'></i> 9141
          </div>
        </div>
        <div className='product__item__text'>
          <ul>
            <li>{movie.category.title}</li>
            <li>{movie.type}</li>
          </ul>
          <h5>
            <Link href={`/anime-details/${movie.slug.current}`}>
              {movie.title}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
