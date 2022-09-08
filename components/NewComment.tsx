import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'

interface Props {
  comment: Comment
}

const NewComment: React.FC<Props> = ({ comment }) => {
  return (
    <div className='product__sidebar__comment__item'>
      <div className='product__sidebar__comment__item__pic'>
        <img
          width={90}
          height={130}
          src={urlFor(comment.movie.mainImage).url()}
          alt=''
        />
      </div>
      <div className='product__sidebar__comment__item__text'>
        <ul>
          <li>{comment.movie.category.title}</li>
          <li>{comment.movie.type}</li>
        </ul>
        <h5>
          <Link href='/'>{comment.movie.title}</Link>
        </h5>
        <span>
          <i className='fa fa-eye'></i> 19.141 Viewes
        </span>
      </div>
    </div>
  )
}

export default NewComment
