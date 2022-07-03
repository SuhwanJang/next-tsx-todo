import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import Header from './components/Header'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import store from '../store'
import wrapper from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}

export default wrapper.withRedux(MyApp)
