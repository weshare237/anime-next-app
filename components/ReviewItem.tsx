import React from 'react'
import { timeSince } from '../utils/facebookTimeAgo'

interface Props {
  comment: Comment
}

const ReviewItem = ({ comment }: Props) => {
  console.log(
    'date--------------------->',
    new Date(comment._createdAt).getFullYear()
  )

  return (
    <div className='anime__review__item'>
      <div className='anime__review__item__pic'>
        <div className='m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase'>
          {comment.name.substring(0, 1).toLocaleUpperCase()}
        </div>
      </div>
      <div className='anime__review__item__text'>
        <h6>
          {comment.name} -{' '}
          <span>{timeSince(new Date(comment._createdAt))}</span>
        </h6>
        <p>{comment.comment}</p>
      </div>
    </div>
  )
}

export default ReviewItem
