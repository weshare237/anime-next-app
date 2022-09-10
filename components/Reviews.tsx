import React, { useState } from 'react'
import ReviewItem from './ReviewItem'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  movie: Movie
}

const Reviews = ({ movie }: Props) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(
          'Thank you for submitting your comment. Once it has been approved, it will appear below!',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        )
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        toast.warning(err.response.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  return (
    <div className='col-lg-8 col-md-8'>
      <ToastContainer />
      <div className='anime__details__review'>
        <div className='section-title'>
          <h5>Reviews</h5>
        </div>
        {movie.comments?.map((comment: Comment) => (
          <ReviewItem key={comment._id} comment={comment} />
        ))}
      </div>
      <div className='blog__details__form'>
        <div className='section-title'>
          <h5>Your Comment</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='hidden'
            value={movie._id}
            {...register('_id')}
            name='_id'
          />
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6'>
              <input
                type='text'
                placeholder='Name'
                {...register('name', { required: true })}
              />
              {errors.name && (
                <div className='mb-2'>
                  <span className='text-red-500'>Please provide name</span>
                </div>
              )}
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6'>
              <input
                type='text'
                placeholder='Email'
                {...register('email', { required: true })}
              />
              {errors.email && (
                <div className='mb-2'>
                  <span className='text-red-500'>
                    Please provide email address
                  </span>
                </div>
              )}
            </div>
            <div className='col-lg-12'>
              <textarea
                placeholder='Your Comment...'
                {...register('comment', { required: true })}
              ></textarea>
              {errors.comment && (
                <div className='mb-2'>
                  <span className='text-red-500'>Please provide comment</span>
                </div>
              )}
              <button type='submit' className='site-btn'>
                {loading ? (
                  <>
                    <svg
                      role='status'
                      className='inline mr-3 w-4 h-4 text-white animate-spin'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='#E5E7EB'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentColor'
                      />
                    </svg>{' '}
                    Reviewing...
                  </>
                ) : (
                  <>
                    <i className='fa fa-location-arrow'></i> Review
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reviews
