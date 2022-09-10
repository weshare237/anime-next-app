import React from 'react'
import StyledBreadCrumb from '../../components/StyledBreadCrumb'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { sanityClient } from '../../lib/sanity'
import { GetStaticProps } from 'next'
import MovieCard from '../../components/MovieCard'

interface Props {
  categoryMovies: Movie[]
}

const Categories: React.FC<Props> = ({ categoryMovies }) => {
  return (
    <>
      <Header />
      <StyledBreadCrumb category={categoryMovies[0].category.title} />
      <section className='product-page spad'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='product__page__content'>
                <div className='product__page__title'>
                  <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-6'>
                      <div className='section-title'>
                        <h4>{categoryMovies[0].category.title}</h4>
                      </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-6'>
                      <div className='product__page__filter'>
                        <p>Order by:</p>
                        <select>
                          <option value=''>A-Z</option>
                          <option value=''>1-10</option>
                          <option value=''>10-50</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  {categoryMovies.map((movie: Movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))}
                </div>
              </div>
              <div className='product__pagination'>
                <a href='#' className='current-page'>
                  1
                </a>
                <a href='#'>2</a>
                <a href='#'>3</a>
                <a href='#'>4</a>
                <a href='#'>5</a>
                <a href='#'>
                  <i className='fa fa-angle-double-right'></i>
                </a>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-8'>
              <div className='product__sidebar'>
                <div className='product__sidebar__view'>
                  <div className='section-title'>
                    <h5>Top Views</h5>
                  </div>
                  <ul className='filter__controls'>
                    <li className='active' data-filter='*'>
                      Day
                    </li>
                    <li data-filter='.week'>Week</li>
                    <li data-filter='.month'>Month</li>
                    <li data-filter='.years'>Years</li>
                  </ul>
                  <div className='filter__gallery'>
                    <div
                      className='product__sidebar__view__item set-bg mix month week'
                      style={{
                        backgroundImage: "url('/img/sidebar/tv-2.jpg')",
                      }}
                    >
                      <div className='ep'>18 / ?</div>
                      <div className='view'>
                        <i className='fa fa-eye'></i> 9141
                      </div>
                      <h5>
                        <Link href='#'>
                          The Seven Deadly Sins: Wrath of the Gods
                        </Link>
                      </h5>
                    </div>

                    <div
                      className='product__sidebar__view__item set-bg mix day'
                      style={{
                        backgroundImage: "url('/img/sidebar/tv-5.jpg')",
                      }}
                    >
                      <div className='ep'>18 / ?</div>
                      <div className='view'>
                        <i className='fa fa-eye'></i> 9141
                      </div>
                      <h5>
                        <Link href='#'>
                          Fate stay night unlimited blade works
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className='product__sidebar__comment'>
                  <div className='section-title'>
                    <h5>New Comment</h5>
                  </div>
                  <div className='product__sidebar__comment__item'>
                    <div className='product__sidebar__comment__item__pic'>
                      <img src='/img/sidebar/comment-1.jpg' alt='' />
                    </div>
                    <div className='product__sidebar__comment__item__text'>
                      <ul>
                        <li>Active</li>
                        <li>Movie</li>
                      </ul>
                      <h5>
                        <Link href='#'>
                          The Seven Deadly Sins: Wrath of the Gods
                        </Link>
                      </h5>
                      <span>
                        <i className='fa fa-eye'></i> 19.141 Viewes
                      </span>
                    </div>
                  </div>
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

export default Categories

export const getStaticPaths = async () => {
  const query = `* [_type == 'category'] {
                   _id,
                 }`
  const categories = await sanityClient.fetch(query)

  const paths = categories.map((category: Category) => ({
    params: {
      _id: category._id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'movie' && category._ref == $_id] {
                  _id,
                    title,
                    slug,
                    mainImage,
                    body,
                    type,
                    category -> {
                      title,
                    },
                }`

  const categoryMovies = await sanityClient.fetch(query, {
    _id: params?._id,
  })

  if (categoryMovies.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categoryMovies,
    },
    revalidate: 60, // after 60 seconds, it will update the old cache version
  }
}
