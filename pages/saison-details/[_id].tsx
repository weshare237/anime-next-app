import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { sanityClient, urlFor } from '../../lib/sanity'
import { GetStaticProps } from 'next'

interface Props {
  episodes: Episode[]
}

const SaisonDetails = ({ episodes }: Props) => {
  console.log(episodes)
  return (
    <>
      <Header />

      <section className='blog-details spad'>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            <div className='col-lg-8'>
              <div className='blog__details__title'>
                <h2>
                  {episodes[0].saison.name.split(' - ')[1]}: {episodes.length}{' '}
                  Episodes of Essential Viewing
                </h2>
                <div className='blog__details__social'>
                  <a href='#' className='facebook'>
                    <i className='fa fa-facebook-square'></i> Facebook
                  </a>
                  <a href='#' className='pinterest'>
                    <i className='fa fa-pinterest'></i> Pinterest
                  </a>
                  <a href='#' className='linkedin'>
                    <i className='fa fa-linkedin-square'></i> Linkedin
                  </a>
                  <a href='#' className='twitter'>
                    <i className='fa fa-twitter-square'></i> Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-8'>
              <div className='blog__details__content'>
                <div className='blog__details__text'>
                  <p>{episodes[0].saison.description}</p>
                </div>
                {episodes.map((episode: Episode) => (
                  <div className='blog__details__item__text' key={episode._id}>
                    <h4>{episode.name.split(' - ')[2]}</h4>
                    <div
                      className='anime__details__pic set-bg'
                      style={{
                        backgroundImage: `url(${urlFor(
                          episode.mainImage
                        ).url()})`,
                      }}
                    ></div>
                    <p>{episode.description}</p>
                    <div className='anime__details__btn mt-3'>
                      <a
                        href={episode.externalLink}
                        className='watch-btn'
                        target='__blank'
                      >
                        <span>Download Now</span>{' '}
                        <i className='fa fa-download'></i>
                      </a>
                    </div>
                  </div>
                ))}

                <div className='blog__details__comment'>
                  <h4>3 Comments</h4>
                  <div className='blog__details__comment__item'>
                    <div className='blog__details__comment__item__pic'>
                      <img src='/img/blog/details/comment-1.png' alt='' />
                    </div>
                    <div className='blog__details__comment__item__text'>
                      <span>Sep 08, 2020</span>
                      <h5>John Smith</h5>
                      <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi
                      </p>
                      <a href='#'>Like</a>
                      <a href='#'>Reply</a>
                    </div>
                  </div>
                  <div className='blog__details__comment__item blog__details__comment__item--reply'>
                    <div className='blog__details__comment__item__pic'>
                      <img src='/img/blog/details/comment-2.png' alt='' />
                    </div>
                    <div className='blog__details__comment__item__text'>
                      <span>Sep 08, 2020</span>
                      <h5>Elizabeth Perry</h5>
                      <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi
                      </p>
                      <a href='#'>Like</a>
                      <a href='#'>Reply</a>
                    </div>
                  </div>
                  <div className='blog__details__comment__item'>
                    <div className='blog__details__comment__item__pic'>
                      <img src='/img/blog/details/comment-3.png' alt='' />
                    </div>
                    <div className='blog__details__comment__item__text'>
                      <span>Sep 08, 2020</span>
                      <h5>Adrian Coleman</h5>
                      <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi
                      </p>
                      <a href='#'>Like</a>
                      <a href='#'>Reply</a>
                    </div>
                  </div>
                </div>
                <div className='blog__details__form'>
                  <h4>Leave A Commnet</h4>
                  <form action='#'>
                    <div className='row'>
                      <div className='col-lg-6 col-md-6 col-sm-6'>
                        <input type='text' placeholder='Name' />
                      </div>
                      <div className='col-lg-6 col-md-6 col-sm-6'>
                        <input type='text' placeholder='Email' />
                      </div>
                      <div className='col-lg-12'>
                        <textarea placeholder='Message'></textarea>
                        <button type='submit' className='site-btn'>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
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

export default SaisonDetails

export const getStaticPaths = async () => {
  const query = `* [_type == 'saison'] {
                   _id,
                 }`
  const saisons = await sanityClient.fetch(query)

  const paths = saisons.map((saison: Saison) => ({
    params: {
      _id: saison._id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'episode' && saison._ref == $_id ] {
                      _id,
                      _createdAt,
                      name, 
                      saison -> {
                        name, 
                        description
                      },
                      description, 
                      mainImage,
                      externalLink,
                  }`

  const episodes = await sanityClient.fetch(query, {
    _id: params?._id,
  })

  if (episodes.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episodes,
    },
    revalidate: 60, // after 60 seconds, it will update the old cache version
  }
}
