import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import '../styles/style.css'
import '../styles/plyr.css'
import '../styles/nice-select.css'
import '../styles/elegant-icons.css'
import '../styles/owl.carousel.min.css'
import '../styles/font-awesome.min.css'
import '../styles/slicknav.min.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
