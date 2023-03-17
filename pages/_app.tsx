import '@/styles/globals.css'
import type { AppProps } from 'next/app'



import { DefaultTheme, ThemeProvider } from "react-jss"


export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={{}}>
    <Component {...pageProps} />
  </ThemeProvider>
}
