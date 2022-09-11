import React, { useState } from 'react'
import Link from 'next/link'
import { MdViewList } from 'react-icons/md'
import Sidebar from './Sidebar'
import { data } from '../utils/data'
import SearchInput from './SearchInput'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  return (
    <>
      {isOpen && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} data={data} />}
      <header className='header'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-2'>
              <div className='header__logo'>
                <Link href='/'>
                  <img src='/img/logo.png' alt='' />
                </Link>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='header__nav'>
                <nav className='header__menu mobile-menu'>
                  <ul>
                    <li className='active'>
                      <Link href='/'>Homepage</Link>
                    </li>
                    <li>
                      <a href='/categories'>
                        Categories
                        <span className='arrow_carrot-down'></span>
                      </a>
                      <ul className='dropdown'>
                        {data?.map((category: Category) => (
                          <li
                            key={category._id}
                            className=' hover:text-blue-600 hover:bg-blue-200 hover:dark:bg-blue-900 hover:dark:text-blue-200'
                          >
                            <Link href={`/categories/${category._id}`}>
                              {category.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <Link href='/contact'>Contacts</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='col-lg-2'>
              <div className='header__right'>
                <a
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className='search-switch'
                >
                  <span className='icon_search'></span>
                </a>
                <a href='/login'>
                  <span className='icon_profile'></span>
                </a>
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  className='cursor-pointer text-white'
                >
                  <MdViewList className='lg:hidden' />
                </a>
              </div>
            </div>
          </div>
          {isSearchOpen && <SearchInput />}
        </div>
      </header>
    </>
  )
}

export default Header
