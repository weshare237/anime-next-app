import React from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  data?: Category[]
}

const Sidebar: React.FC<Props> = ({ isOpen, setIsOpen, data }) => {
  return (
    <>
      {/* <!-- drawer component --> */}
      <div
        id='drawer-navigation'
        className='lg:hidden fixed z-40 h-fit p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800'
        tabIndex={-1}
        aria-labelledby='drawer-navigation-label'
      >
        <h5
          id='drawer-navigation-label'
          className='text-base font-semibold text-gray-500 uppercase dark:text-gray-400'
        >
          Menu
        </h5>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          data-drawer-dismiss='drawer-navigation'
          aria-controls='drawer-navigation'
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>
        <div className='py-4 overflow-y-auto'>
          <ul className='space-y-2'>
            <li>
              <a
                href='/'
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:text-blue-600 hover:bg-blue-200 hover:dark:bg-blue-900 hover:dark:text-blue-200'
              >
                <svg
                  aria-hidden='true'
                  className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                  <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                </svg>
                <span className='ml-3'>Homepage</span>
              </a>
            </li>

            {data?.map((category: Category) => (
              <li key={category._id}>
                <a
                  href={`/categories/${category._id}`}
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:text-blue-600 hover:bg-blue-200 hover:dark:bg-blue-900 hover:dark:text-blue-200'
                >
                  <svg
                    aria-hidden='true'
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                    <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                  </svg>
                  <span className='ml-3'>{category.title}</span>
                </a>
              </li>
            ))}

            <li>
              <a
                href='/contact'
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:text-blue-600 hover:bg-blue-200 hover:dark:bg-blue-900 hover:dark:text-blue-200'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                  <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Contact</span>
              </a>
            </li>
            <li>
              <a
                href='/login'
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:text-blue-600 hover:bg-blue-200 hover:dark:bg-blue-900 hover:dark:text-blue-200'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Sign In</span>
              </a>
            </li>
            <li>
              <a
                href='/register'
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:text-blue-600 hover:bg-blue-200 hover:dark:bg-blue-900 hover:dark:text-blue-200'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
