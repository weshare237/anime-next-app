import React from 'react'
import StyledBreadCrumb from '../../components/StyledBreadCrumb'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { sanityClient } from '../../lib/sanity'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
  episodes: Episode[]
}

const SaisonDetails = ({ episodes }: Props) => {
  console.log(episodes)
  return (
    <>
      <Header />
      <StyledBreadCrumb />
      <section className='anime-details spad'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='anime__details__text'>
                <div className='anime__details__title'>
                  <h3>{episodes[0].saison.name.split(' - ')[1]}</h3>
                  {/* <span>フェイト／ステイナイト, Feito／sutei naito</span> */}
                </div>
                <p>{episodes[0].saison.description}</p>
              </div>

              <div className='anime__details__episodes'>
                <div className='section-title'>
                  <h5>List Name</h5>
                </div>
                {episodes.map((episode: Episode) => (
                  <Link
                    key={episode._id}
                    href={`/episode-details/${episode._id}`}
                  >
                    {episode.name.split(' - ')[2]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='anime__details__review'>
                <div className='section-title'>
                  <h5>Reviews</h5>
                </div>
                <div className='anime__review__item'>
                  <div className='anime__review__item__pic'>
                    <img src='/img/anime/review-1.jpg' alt='' />
                  </div>
                  <div className='anime__review__item__text'>
                    <h6>
                      Chris Curry - <span>1 Hour ago</span>
                    </h6>
                    <p>
                      whachikan Just noticed that someone categorized this as
                      belonging to the genre "demons" LOL
                    </p>
                  </div>
                </div>
                <div className='anime__review__item'>
                  <div className='anime__review__item__pic'>
                    <img src='/img/anime/review-2.jpg' alt='' />
                  </div>
                  <div className='anime__review__item__text'>
                    <h6>
                      Lewis Mann - <span>5 Hour ago</span>
                    </h6>
                    <p>Finally it came out ages ago</p>
                  </div>
                </div>
                <div className='anime__review__item'>
                  <div className='anime__review__item__pic'>
                    <img src='/img/anime/review-3.jpg' alt='' />
                  </div>
                  <div className='anime__review__item__text'>
                    <h6>
                      Louis Tyler - <span>20 Hour ago</span>
                    </h6>
                    <p>Where is the episode 15 ? Slow update! Tch</p>
                  </div>
                </div>
                <div className='anime__review__item'>
                  <div className='anime__review__item__pic'>
                    <img src='/img/anime/review-4.jpg' alt='' />
                  </div>
                  <div className='anime__review__item__text'>
                    <h6>
                      Chris Curry - <span>1 Hour ago</span>
                    </h6>
                    <p>
                      whachikan Just noticed that someone categorized this as
                      belonging to the genre "demons" LOL
                    </p>
                  </div>
                </div>
                <div className='anime__review__item'>
                  <div className='anime__review__item__pic'>
                    <img src='/img/anime/review-5.jpg' alt='' />
                  </div>
                  <div className='anime__review__item__text'>
                    <h6>
                      Lewis Mann - <span>5 Hour ago</span>
                    </h6>
                    <p>Finally it came out ages ago</p>
                  </div>
                </div>
                <div className='anime__review__item'>
                  <div className='anime__review__item__pic'>
                    <img src='/img/anime/review-6.jpg' alt='' />
                  </div>
                  <div className='anime__review__item__text'>
                    <h6>
                      Louis Tyler - <span>20 Hour ago</span>
                    </h6>
                    <p>Where is the episode 15 ? Slow update! Tch</p>
                  </div>
                </div>
              </div>
              <div className='anime__details__form'>
                <div className='section-title'>
                  <h5>Your Comment</h5>
                </div>
                <form action='#'>
                  <textarea placeholder='Your Comment'></textarea>
                  <button type='submit'>
                    <i className='fa fa-location-arrow'></i> Review
                  </button>
                </form>
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
                      }
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
