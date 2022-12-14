import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import StyledBreadCrumb from '../../components/StyledBreadCrumb'
import { sanityClient, urlFor } from '../../lib/sanity'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import PortableText from 'react-portable-text'
import Reviews from '../../components/Reviews'
import SimilarMovie from '../../components/SimilarMovie'
import Footer from '../../components/Footer'
import SingleSkeleton from '../../components/SingleSkeleton'

interface Props {
  movie: Movie
  saisons: Saison[]
}

const AnimeDetails: React.FC<Props> = ({ movie, saisons }) => {
  const [loading, setLoading] = useState(true)
  console.log(saisons)

  useEffect(() => {
    if (movie) {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }, [movie])

  //Initialize an array of length 13 and fill it with 0's
  let skeletonCards = Array(1).fill(0)

  return (
    <div>
      <Header />
      <StyledBreadCrumb category={movie.category} movieName={movie.title} />
      <section className='anime-details spad'>
        <div className='container'>
          {loading ? (
            skeletonCards.map((index: number) => <SingleSkeleton key={index} />)
          ) : (
            <div className='anime__details__content'>
              <div className='row'>
                <div className='col-lg-3'>
                  <div
                    className='anime__details__pic set-bg'
                    style={{
                      backgroundImage: `url(${urlFor(movie.mainImage).url()})`,
                    }}
                  >
                    <div className='comment'>
                      <i className='fa fa-comments'></i>{' '}
                      {movie.comments?.length}
                    </div>
                    <div className='view'>
                      <i className='fa fa-eye'></i> 9141
                    </div>
                  </div>
                </div>
                <div className='col-lg-9'>
                  <div className='anime__details__text'>
                    <div className='anime__details__title'>
                      <h3>{movie.title}</h3>
                      {/* <span>?????????????????????????????????, Feito???sutei naito</span> */}
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

                    <PortableText
                      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                      content={movie.body}
                      serializers={{
                        h2: (props: any) => (
                          <h1 className='text-xl font-bold my-5' {...props} />
                        ),
                        link: ({ href, children }: any) => (
                          <a
                            href={href}
                            className='text-violet-500 hover:underline cursor-pointer'
                            target='__blank'
                          >
                            {children}
                          </a>
                        ),
                      }}
                    />

                    <div className='anime__details__widget'>
                      <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                          <ul>
                            <li>
                              <span>Type:</span> {movie.type}
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
                              <span>Genre:</span> {movie.category.title}
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
                              <span>Quality:</span> {movie.quality}
                            </li>
                            <li>
                              <span>Views:</span> 131,541
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='anime__details__btn'>
                      {saisons.length === 0 ? (
                        <a
                          href={movie.externalLink}
                          className='watch-btn'
                          target='__blank'
                        >
                          <span>Download Now</span>{' '}
                          <i className='fa fa-download'></i>
                        </a>
                      ) : (
                        <div className='anime__details__episodes'>
                          <div className='section-title'>
                            <h5>List Name</h5>
                          </div>
                          {saisons.map((saison: Saison) => (
                            <Link
                              key={saison._id}
                              href={`/saison-details/${saison._id}`}
                            >
                              {saison.name.split(' - ')[1]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='row'>
            <Reviews movie={movie} />
            <SimilarMovie />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AnimeDetails

export const getStaticPaths = async () => {
  const query = `* [_type == 'movie'] {
                   _id,
                   slug {
                     current
                   }
                 }`
  const movies = await sanityClient.fetch(query)

  const paths = movies.map((movie: Movie) => ({
    params: {
      slug: movie.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'movie' && slug.current == $slug] [0] {
                  _id,
                  _createdAt,
                  title,
                  slug,
                  mainImage,
                  category -> {
                    _id,
                    title,
                  },
                  "comments": * [
                    _type == "comment" && 
                    movie._ref == ^._id && 
                    approved == true
                  ],
                  quality,
                  body,
                  type,
                  externalLink,
                }`

  const movie: Movie = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!movie) {
    return {
      notFound: true,
    }
  }

  const saisonsQuery = `* [_type == 'saison' && serie._ref == $_id] {
                      _id,
                      _createdAt,
                      name, 
                      description,
                      serie -> {
                        title,
                        body,
                      },
                  }`

  const saisons = await sanityClient.fetch(saisonsQuery, {
    _id: movie._id,
  })

  if (saisons.length !== 0) {
    return {
      props: {
        movie,
        saisons,
      },
      revalidate: 60, // after 60 seconds, it will update the old cache version
    }
  }

  return {
    props: {
      movie,
      saisons: [],
    },
    revalidate: 60, // after 60 seconds, it will update the old cache version
  }
}
