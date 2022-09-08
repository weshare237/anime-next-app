import React from 'react'
import Link from 'next/link'
import StyledBreadCrumb from '../../components/StyledBreadCrumb'
import { sanityClient, urlFor } from '../../lib/sanity'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import PortableText from 'react-portable-text'
import Reviews from '../../components/Reviews'
import SimilarMovie from '../../components/SimilarMovie'
import Footer from '../../components/Footer'

interface Props {
  episode: Episode
}

const EpisodeDetails: React.FC<Props> = ({ episode }) => {
  console.log(episode)

  return (
    <div>
      <Header />
      <StyledBreadCrumb />
      <section className='anime-details spad'>
        <div className='container'>
          <div className='anime__details__content'>
            <div className='row'>
              <div className='col-lg-3'>
                <div
                  className='anime__details__pic set-bg'
                  style={{
                    backgroundImage: `url(${urlFor(episode.mainImage).url()})`,
                  }}
                >
                  <div className='comment'>
                    {/* <i className='fa fa-comments'></i> {movie.comments.length} */}
                  </div>
                  <div className='view'>
                    <i className='fa fa-eye'></i> 9141
                  </div>
                </div>
              </div>
              <div className='col-lg-9'>
                <div className='anime__details__text'>
                  <div className='anime__details__title'>
                    <h3>{episode.name.split(' - ')[2]}</h3>
                    {/* <span>フェイト／ステイナイト, Feito／sutei naito</span> */}
                  </div>
                  <div className='anime__details__rating'>
                    <div className='rating'>
                      <Link href='#'>
                        <i className='fa fa-star'></i>
                      </Link>
                      <Link href='#'>
                        <i className='fa fa-star'></i>
                      </Link>
                      <Link href='#'>
                        <i className='fa fa-star'></i>
                      </Link>
                      <Link href='#'>
                        <i className='fa fa-star'></i>
                      </Link>
                      <Link href='#'>
                        <i className='fa fa-star-half-o'></i>
                      </Link>
                    </div>
                    <span>1.029 Votes</span>
                  </div>

                  <p>{episode.description}</p>

                  <div className='anime__details__widget'>
                    <div className='row'>
                      <div className='col-lg-6 col-md-6'>
                        <ul>
                          <li>
                            <span>Type:</span> {episode.saison.serie.type}
                          </li>
                          <li>
                            <span>Studios:</span> Lerche
                          </li>
                          <li>
                            <span>Date aired:</span> Oct 02, 2019 to ?
                          </li>
                          <li>
                            <span>Status:</span> Airing
                          </li>
                          <li>
                            <span>Genre:</span>{' '}
                            {episode.saison.serie.category.title}
                          </li>
                        </ul>
                      </div>
                      <div className='col-lg-6 col-md-6'>
                        <ul>
                          <li>
                            <span>Scores:</span> 7.31 / 1,515
                          </li>
                          <li>
                            <span>Rating:</span> 8.5 / 161 times
                          </li>
                          <li>
                            <span>Duration:</span> 24 min/ep
                          </li>
                          <li>
                            <span>Quality:</span> {episode.saison.serie.quality}
                          </li>
                          <li>
                            <span>Views:</span> 131,541
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='anime__details__btn'>
                    <a href='#' className='follow-btn'>
                      <i className='fa fa-heart-o'></i> Follow
                    </a>
                    <a href={episode.externalLink} className='watch-btn'>
                      <span>Download Now</span>
                      <i className='fa fa-download'></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            {/* <Reviews movie={episode} /> */}
            <SimilarMovie />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default EpisodeDetails

export const getStaticPaths = async () => {
  const query = `* [_type == 'episode'] {
                   _id,
                 }`
  const episodes = await sanityClient.fetch(query)

  const paths = episodes.map((episode: Episode) => ({
    params: {
      _id: episode._id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'episode' && _id == $_id] [0] {
                  _id,
                  _createdAt,
                  name,
                  description,
                  externalLink,
                  mainImage,
                  saison -> {
                    serie -> {
                      type, 
                      quality, 
                      category -> {
                        title,
                      }
                    }
                  }
                }`

  const episode = await sanityClient.fetch(query, {
    _id: params?._id,
  })

  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
    },
    revalidate: 60, // after 60 seconds, it will update the old cache version
  }
}
