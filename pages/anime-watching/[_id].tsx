import React from 'react'
import StyledBreadCrumb from '../../components/StyledBreadCrumb'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { sanityClient } from '../../lib/sanity'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
  saisons: Saison[]
}

const AnimeWatching = ({ saisons }: Props) => {
  console.log(saisons)
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
                  <h3>{saisons[0].serie.title}</h3>
                  {/* <span>フェイト／ステイナイト, Feito／sutei naito</span> */}
                </div>
                <PortableText
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                  content={saisons[0].serie.body}
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
              </div>

              <div className='anime__details__episodes'>
                <div className='section-title'>
                  <h5>List Name</h5>
                </div>
                {saisons.map((saison: Saison) => (
                  <Link key={saison._id} href={`/saison-details/${saison._id}`}>
                    {saison.name.split(' - ')[1]}
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

export default AnimeWatching

export const getStaticPaths = async () => {
  const query = `* [_type == 'movie' && type == 'Serie'] {
                   _id,
                 }`
  const series = await sanityClient.fetch(query)

  const paths = series.map((serie: Movie) => ({
    params: {
      _id: serie._id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'saison' && serie._ref == $_id] {
                      _id,
                      _createdAt,
                      name, 
                      description,
                      serie -> {
                        title,
                        body,
                      },
                  }`

  const saisons = await sanityClient.fetch(query, {
    _id: params?._id,
  })

  if (saisons.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      saisons,
    },
    revalidate: 60, // after 60 seconds, it will update the old cache version
  }
}
