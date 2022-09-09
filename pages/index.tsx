import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import NewComment from '../components/NewComment'
import SkeletonCard from '../components/SkeletonCard'
import TopView from '../components/TopView'
import { sanityClient } from '../lib/sanity'

interface Props {
  movies: Movie[]
  comments: Comment[]
}

const Home: React.FC<Props> = ({ movies, comments }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (movies) {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }, [movies])

  let skeletonCards = Array(4).fill(0)

  return (
    <div>
      <Head>
        <meta name='description' content='Anime Template' />
        <meta name='keywords' content='Anime, unica, creative, html' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta http-equiv='X-UA-Compatible' content='ie=edge' />
        <title>Anime</title>

        {/* <!-- Google Font --> */}
        <link
          href='https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />

        {/* <!-- Js Plugins --> */}
        <Script src='/js/jquery-3.3.1.min.js'></Script>
        <Script src='/js/bootstrap.min.js'></Script>
        <Script src='/js/player.js'></Script>
        <Script src='/js/jquery.nice-select.min.js'></Script>
        <Script src='/js/mixitup.min.js'></Script>
        <Script src='/js/jquery.slicknav.js'></Script>
        <Script src='/js/owl.carousel.min.js'></Script>
        <Script src='/js/main.js'></Script>
      </Head>

      <Header />
      {loading ? (
        skeletonCards.map((value: number, index: number) => (
          <SkeletonCard key={index} />
        ))
      ) : (
        <section className='product spad max-w-7xl mx-auto'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8'>
                <div className='trending__product'>
                  <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8'>
                      <div className='section-title'>
                        <h4>Trending Now</h4>
                      </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4'>
                      <div className='btn__all'>
                        <a href='#' className='primary-btn'>
                          View All <span className='arrow_right'></span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    {movies.map((movie: Movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-8'>
                <div className='product__sidebar'>
                  <TopView />
                  <div className='product__sidebar__comment'>
                    <div className='section-title'>
                      <h5>New Comment</h5>
                    </div>
                    {comments.map((comment: Comment) => (
                      <NewComment key={comment._id} comment={comment} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const query = `* [_type == 'movie'] {
                    _id,
                    title,
                    slug,
                    mainImage,
                    body,
                    type,
                    category -> {
                      title,
                    },
                    "comments": * [
                      _type == "comment" && 
                      movie._ref == ^._id && 
                      approved == true
                    ],
                    externalLink,
                  }`

  const movies = await sanityClient.fetch(query)

  const commentsQuery = `
                          * [_type == 'comment' && approved == true] {
                            _id,
                            _createdAt,
                            comment,
                            movie -> {
                              mainImage,
                              type,
                              category -> {
                                title,
                              },
                              title,
                            }
                        }`
  const comments = await sanityClient.fetch(commentsQuery)

  return {
    props: {
      movies,
      comments,
    },
  }
}
